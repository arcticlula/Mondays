import { firestore, Timestamp, increment, decrement, deleteField } from '../../plugins/firebase'
import moment from 'moment';
import hydrate from "../../utils/hydrate"
import asyncForEach from "../../utils/asyncForEach"
import { isEmpty } from "lodash";

export default {
	async getGoalsFromPlayer(context) {
		let Player = firestore.collection('Players').doc(id);
		return await firestore.collection('Goals').where("goal", '==', Player).orderBy("time", "desc").onSnapshot(querySnapshot => {
			const goals = querySnapshot.docs.map(doc => {
				return { id: doc.id, ...doc.data() };
			})
			context.commit('setGoals', goals)
		});
	},
	async getGoalsFromMatch(context, id) {
		let Match = firestore.collection('Matches').doc(id);
		return await firestore.collection('Goals').where("match", "==", Match).orderBy('timeMin').onSnapshot(async querySnapshot => {
			let goals = []
			await asyncForEach(querySnapshot.docs, async doc => {
				let data = doc.data()
				data.id = doc.id;
				goals.push(data);
			})
			context.commit('setGoals', goals)
		});
	},
	async setTimeMin({ rootState, state }) {
		let dateMatch = moment(rootState.matches.match.beginTime.toDate())
		let dateGoal = new Date(
			state.goalEdit.datetime +
			'T' +
			state.goalEdit.time +
			'Z'
		)
		state.goalEdit.timeMin = moment(dateGoal).diff(dateMatch, 'minute')
	},
	async addGoal({ rootState, state }, data) {
		let obj = JSON.parse(JSON.stringify(data))
		let Users = firestore.collection('Users');
		let Players = firestore.collection('Players');
		let Teams = firestore.collection('Teams');
		let Matches = firestore.collection('Matches');
		let Goal = firestore.collection('Goals').doc()
		let timeModified = Timestamp.fromDate(new Date());
		let userModified = Users.doc(rootState.user.uid);
		let batch = firestore.batch();
		let highscores = {}
		let props = {
			"props.dateModified": timeModified, "props.userModified": userModified, "props.lastOperation": "Add Goal"
		};
		let counterPlayer = {}, counterTeam = {}, counterOtherTeam = {}, counterMatch = {};
		try {
			obj.props = { dateCreated: timeModified, dateModified: timeModified, userCreated: userModified, userModified: userModified }
			let dateMatch = rootState.matches.match.beginTime.toDate()
			let dateGoal = new Date(obj.date + 'T' + obj.time + 'Z');
			obj.time = Timestamp.fromDate(dateGoal);
			obj.timeMin = moment(dateGoal).diff(dateMatch, 'minute');
			obj.local = obj.local == 'A' ? 'home' : 'away';
			switch (obj.type) {
				case "O":
					obj.local = obj.local == 'home' ? 'away' : 'home';
					counterPlayer = { "counter.goals.ownGoals": increment }
					counterTeam = counterPlayer
					counterOtherTeam = { "counter.goals.total": increment }
					counterMatch = { ...counterTeam, ...counterOtherTeam, ["counter.goals." + [obj.local]]: increment }
					highscores = { ["players." + [obj.goal] + ".ownGoals"]: increment }
					obj.isOwnGoal = true;
					obj.isPenalty = false;
					obj.isPenaltyFailed = false;
					break;
				case "P":
					counterTeam = { "counter.goals.total": increment, "counter.goals.penalties": increment }
					counterPlayer = { ["counter.goals." + [obj.local]]: increment, ...counterTeam }
					counterMatch = counterPlayer;
					highscores = { ["players." + [obj.goal] + ".goals"]: increment, ["players." + [obj.goal] + ".penalties"]: increment }
					obj.isOwnGoal = false;
					obj.isPenalty = true;
					obj.isPenaltyFailed = false;
					break;
				case "PF":
					counterPlayer = { "counter.goals.penaltiesFailed": increment }
					counterTeam = counterPlayer;
					counterMatch = counterPlayer;
					highscores = { ["players." + [obj.goal] + ".penaltiesFailed"]: increment }
					obj.isOwnGoal = false;
					obj.isPenalty = false;
					obj.isPenaltyFailed = true;
					break;
				default:
					counterTeam = { "counter.goals.total": increment }
					counterPlayer = { ["counter.goals." + [obj.local]]: increment, ...counterTeam }
					counterMatch = counterPlayer;
					highscores = { ["players." + [obj.goal] + ".goals"]: increment }
					obj.isOwnGoal = false;
					obj.isPenalty = false;
					obj.isPenaltyFailed = false;
					break;
			}
			delete obj.type;
			if (isEmpty(obj.url.link)) delete obj.url

			// /**						Players					**/
			if (!isEmpty(obj.goal)) {
				obj.goal = Players.doc(obj.goal)
				const player = (await obj.goal.get()).data();
				obj.players = { goal: { "name": player.name, "nickname": player.nickname } }
				batch.update(obj.goal, {
					...props, ...counterPlayer, ['goals.' + [Goal.id]]: true
				})
			}
			if (!isEmpty(obj.assist)) {
				counterPlayer = { 'counter.assists.total': increment, ["counter.assists." + [obj.local]]: increment }
				counterTeam = { ...counterTeam, 'counter.assists.total': increment }
				counterMatch = { ...counterMatch, 'counter.assists.total': increment, ["counter.assists." + [obj.local]]: increment }
				highscores = { ...highscores, ["players." + [obj.assist] + ".assists"]: increment }
				obj.assist = Players.doc(obj.assist)
				const player = (await obj.assist.get()).data();
				obj.players = { assist: { "name": player.name, "nickname": player.nickname }, ...obj.players }
				batch.update(obj.assist, {
					...props, ...counterPlayer, ['assists.' + [Goal.id]]: true
				})
			}
			/**						Teams					**/
			if (!isEmpty(obj.team)) {
				obj.team = Teams.doc(obj.team);
				batch.update(obj.team, {
					...props, ...counterTeam, ['goals.' + [Goal.id]]: true
				});
			}

			if (!isEmpty(counterOtherTeam)) {
				obj.otherTeam = Teams.doc(obj.otherTeam);
				batch.update(obj.otherTeam, {
					...props, ...counterOtherTeam
				});
			}
			delete obj.otherTeam;

			/** 					Match					**/
			if (!isEmpty(obj.match)) {
				obj.match = Matches.doc(obj.match);
				batch.update(obj.match, {
					...props, ...counterMatch, ...highscores, ['goals.' + [Goal.id]]: true
				})
			}
			/** 					Goals					**/
			batch.set(Goal, obj);
			await batch.commit();
		}
		catch (e) {
			console.log(e);
		}
	},
	async editGoal({ state, rootState }) {
		let objGoal = JSON.parse(JSON.stringify(state.goalEdit))
		console.log(objGoal)
		let Goal = firestore.collection('Goals').doc(objGoal.id)
		let timeModified = Timestamp.fromDate(new Date());
		let userModified = firestore.collection('Users').doc(rootState.user.uid);
		let props = {
			"props.dateModified": timeModified, "props.userModified": userModified, "props.lastOperation": "Edit Goal"
		};
		try {
			let time = new Date(objGoal.datetime + 'T' + objGoal.time + 'Z')
			time = Timestamp.fromDate(time);
			console.log(time)
			let url = { link: objGoal.URLLink, time: objGoal.URLTime }
			Goal.update({ time: time, timeMin: objGoal.timeMin, url: url, ...props })
		}
		catch (e) {
			console.log(e);
		}
	},
	async delGoal(context, obj) {
		console.log(obj)
		let Users = firestore.collection('Users');
		let Players = firestore.collection('Players');
		let Teams = firestore.collection('Teams');
		let Matches = firestore.collection('Matches');
		let Goals = firestore.collection('Goals');
		let GoalPlayer = !isEmpty(obj.goal) ? Players.doc(obj.goal.id) : null;
		let AssistPlayer = (!isEmpty(obj.assist)) ? Players.doc(obj.assist.id) : null
		let Team = Teams.doc(obj.team.id);
		const matchId = obj.match.id;
		obj.match = (await obj.match.get()).data()
		obj.match.id = matchId
		let otherTeam = (obj.team.id == obj.match.teamA.id) ? Teams.doc(obj.match.teamB.id) : Teams.doc(obj.match.teamA.id)
		let Match = Matches.doc(obj.match.id);
		let Goal = Goals.doc(obj.id);
		let docSnapshot = await Goal.get();
		if (!docSnapshot.exists) {
			return
		}
		let timeModified = Timestamp.fromDate(new Date());
		let userModified = Users.doc(context.rootState.user.uid);
		let batch = firestore.batch();
		let highscores = {}
		let props = {
			"props.dateModified": timeModified, "props.userModified": userModified, "props.lastOperation": "Delete Goal"
		};
		let counterPlayer = {}, counterTeam = {}, counterOtherTeam = {}, counterMatch = {};
		try {
			if (obj.isOwnGoal) {
				counterPlayer = { "counter.goals.ownGoals": decrement }
				counterTeam = counterPlayer
				counterOtherTeam = { "counter.goals.total": decrement }
				counterMatch = { ...counterTeam, ...counterOtherTeam, ["counter.goals." + [obj.local]]: decrement }
				highscores = { ["players." + [obj.goal.id] + ".ownGoals"]: decrement }

			}
			else if (obj.isPenalty) {
				counterTeam = { "counter.goals.total": decrement, "counter.goals.penalties": decrement }
				counterPlayer = { ["counter.goals." + [obj.local]]: decrement, ...counterTeam }
				counterMatch = counterPlayer;
				highscores = { ["players." + [obj.goal.id] + ".goals"]: decrement, ["players." + [obj.goal.id] + ".penalties"]: decrement }
			}
			else if (obj.isPenaltyFailed) {
				counterPlayer = { "counter.goals.penaltiesFailed": decrement }
				counterTeam = counterPlayer;
				counterMatch = counterPlayer;
				highscores = { ["players." + [obj.goal.id] + ".penaltiesFailed"]: decrement }
			}
			else {
				counterTeam = { "counter.goals.total": decrement }
				counterPlayer = { ["counter.goals." + [obj.local]]: decrement, ...counterTeam }
				counterMatch = counterPlayer;
				highscores = { ["players." + [obj.goal.id] + ".goals"]: decrement }
			}
			// /**						Players					**/
			if (!isEmpty(GoalPlayer)) {
				batch.update(GoalPlayer, {
					...props, ...counterPlayer, ['goals.' + [obj.id]]: deleteField
				})
			}
			if (!isEmpty(AssistPlayer)) {
				counterPlayer = { 'counter.assists.total': decrement, ["counter.assists." + [obj.local]]: decrement }
				counterTeam = { ...counterTeam, 'counter.assists.total': decrement }
				counterMatch = { ...counterMatch, 'counter.assists.total': decrement, ["counter.assists." + [obj.local]]: decrement }
				highscores = { ...highscores, ["players." + [obj.assist.id] + ".assists"]: decrement }
				batch.update(AssistPlayer, {
					...props, ...counterPlayer, ['assists.' + [obj.id]]: deleteField
				})
			}
			/**						Teams					**/
			if (!isEmpty(Team)) {
				batch.update(Team, {
					...props, ...counterTeam, ['goals.' + [obj.id]]: deleteField
				});
			}

			if (!isEmpty(otherTeam)) {
				batch.update(otherTeam, {
					...props, ...counterOtherTeam
				});
			}

			/** 					Match					**/
			if (!isEmpty(Match)) {
				batch.update(Match, {
					...props, ...counterMatch, ...highscores, ['goals.' + [obj.id]]: deleteField
				})
			}
			/** 					Goals					**/
			batch.delete(Goal);
			await batch.commit();
		}
		catch (e) {
			console.log(e);
		}
	}
}