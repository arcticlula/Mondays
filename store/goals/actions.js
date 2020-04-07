import { firestore, Timestamp, increment, decrement, deleteField } from '../../plugins/firebase'
import moment from 'moment';
import hydrate from "../../utils/hydrate"
import asyncForEach from "../../utils/asyncForEach"
import lodash from "lodash";

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
				await hydrate(data, ['goal', 'assist'])
				data.id = doc.id;
				goals.push(data);
			})
			context.commit('setGoals', goals)
		});
	},
	async addGoal(context, data) {
		let obj = JSON.parse(JSON.stringify(data))
		let Users = firestore.collection('Users');
		let Players = firestore.collection('Players');
		let Teams = firestore.collection('Teams');
		let Matches = firestore.collection('Matches');
		let Match = await Matches.doc(obj.match).get();
		let Goal = firestore.collection('Goals').doc()
		let timeModified = Timestamp.fromDate(new Date());
		let userModified = Users.doc(context.rootState.user.uid);
		let batch = firestore.batch();
		let highscores = {}
		let props = {
			"props.dateModified": timeModified, "props.userModified": userModified, "props.lastOperation": "Add Goal"
		};
		let counterPlayer = {}, counterTeam = {}, counterOtherTeam = {}, counterMatch = {};
		try {
			obj.props = { dateCreated: timeModified, dateModified: timeModified, userCreated: userModified, userModified: userModified }
			let date = moment(Match.data().beginTime.toDate())
			let dateGoal = new Date(date.format('YYYY-MM-DD') + 'T' + obj.time + 'Z');
			obj.time = Timestamp.fromDate(dateGoal);
			obj.timeMin = moment(dateGoal).diff(date, 'minute');
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
					break;
				case "P":
					counterTeam = { "counter.goals.total": increment, "counter.goals.penalties": increment }
					counterPlayer = { ["counter.goals." + [obj.local]]: increment, ...counterTeam }
					counterMatch = counterPlayer;
					highscores = { ["players." + [obj.goal] + ".goals"]: increment, ["players." + [obj.goal] + ".penalties"]: increment }
					obj.isOwnGoal = false;
					obj.isPenalty = true;
					break;
				default:
					counterTeam = { "counter.goals.total": increment }
					counterPlayer = { ["counter.goals." + [obj.local]]: increment, ...counterTeam }
					counterMatch = counterPlayer;
					console.log(obj.goal)
					highscores = { ["players." + [obj.goal] + ".goals"]: increment }
					obj.isOwnGoal = false;
					obj.isPenalty = false;
					break;
			}
			delete obj.type;

			// /**						Players					**/
			if (!_.isEmpty(obj.goal)) {
				obj.goal = Players.doc(obj.goal)
				batch.update(obj.goal, {
					...props, ...counterPlayer, ['goals.' + [Goal.id]]: true
				})
			}
			if (!_.isEmpty(obj.assist)) {
				counterPlayer = { 'counter.assists.total': increment, ["counter.assists." + [obj.local]]: increment }
				counterTeam = { ...counterTeam, 'counter.assists.total': increment }
				counterMatch = { ...counterMatch, 'counter.assists.total': increment, ["counter.assists." + [obj.local]]: increment }
				highscores = { ...highscores, ["players." + [obj.assist] + ".assists"]: increment }
				obj.assist = Players.doc(obj.assist)
				batch.update(obj.assist, {
					...props, ...counterPlayer, ['assists.' + [Goal.id]]: true
				})
			}
			/**						Teams					**/
			if (!_.isEmpty(obj.team)) {
				obj.team = Teams.doc(obj.team);
				batch.update(obj.team, {
					...props, ...counterTeam, ['goals.' + [Goal.id]]: true
				});
			}

			if (!_.isEmpty(counterOtherTeam)) {
				obj.otherTeam = Teams.doc(obj.otherTeam);
				batch.update(obj.otherTeam, {
					...props, ...counterOtherTeam
				});
			}
			delete obj.otherTeam;

			/** 					Match					**/
			if (!_.isEmpty(obj.match)) {
				obj.match = Matches.doc(obj.match);
				batch.update(obj.match, {
					...props, ...counterMatch, ...highscores, ['goals.' + [Goal.id]]: true
				})
			}
			/** 					Goals					**/
			batch.set(Goal, obj);
			return await batch.commit();
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
		let GoalPlayer = !_.isEmpty(obj.goal) ? Players.doc(obj.goal.id) : null;
		let AssistPlayer = (!_.isEmpty(obj.assist)) ? Players.doc(obj.assist.id) : null
		let Team = Teams.doc(obj.team.id);
		const matchId = obj.match.id;
		obj.match = (await obj.match.get()).data()
		obj.match.id = matchId
		let otherTeam = (obj.team.id == obj.match.teamA.id) ? Teams.doc(obj.match.teamB.id) : Teams.doc(obj.match.teamA.id)
		let Match = Matches.doc(obj.match.id);
		let Goal = Goals.doc(obj.id);
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
			else {
				counterTeam = { "counter.goals.total": decrement }
				counterPlayer = { ["counter.goals." + [obj.local]]: decrement, ...counterTeam }
				counterMatch = counterPlayer;
				highscores = { ["players." + [obj.goal.id] + ".goals"]: decrement }
			}
			// /**						Players					**/
			if (!_.isEmpty(GoalPlayer)) {
				batch.update(GoalPlayer, {
					...props, ...counterPlayer, ['goals.' + [obj.id]]: deleteField
				})
			}
			if (!_.isEmpty(AssistPlayer)) {
				counterPlayer = { 'counter.assists.total': decrement, ["counter.assists." + [obj.local]]: decrement }
				counterTeam = { ...counterTeam, 'counter.assists.total': decrement }
				counterMatch = { ...counterMatch, 'counter.assists.total': decrement, ["counter.assists." + [obj.local]]: decrement }
				highscores = { ...highscores, ["players." + [obj.assist.id] + ".assists"]: decrement }
				batch.update(AssistPlayer, {
					...props, ...counterPlayer, ['assists.' + [obj.id]]: deleteField
				})
			}
			/**						Teams					**/
			if (!_.isEmpty(Team)) {
				batch.update(Team, {
					...props, ...counterTeam, ['goals.' + [obj.id]]: deleteField
				});
			}

			if (!_.isEmpty(otherTeam)) {
				batch.update(otherTeam, {
					...props, ...counterOtherTeam
				});
			}

			/** 					Match					**/
			if (!_.isEmpty(Match)) {
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