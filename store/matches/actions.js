import { firestore, Timestamp, increment, decrement, deleteField } from '../../plugins/firebase'
import moment from 'moment'
import hydrate from "../../utils/hydrate"

export default {
	async getMatchById(context, id) {
		return await firestore.collection('Matches').doc(id).onSnapshot(documentSnapshot => {
			if (documentSnapshot.exists)
				context.commit('setMatch', { id: id, ...documentSnapshot.data() })
			else {
				context.commit('setMatch', null)
			}
		});
	},
	async getMatchByIdOnce(context, id) {
		return await firestore.collection('Matches').doc(id).get().then(documentSnapshot => {
			if (documentSnapshot.exists)
				context.commit('setMatch', { id: id, ...documentSnapshot.data() })
			else {
				context.commit('setMatch', null)
			}
		});
	},
	// async getMatchByIdStatic(context, id) {
	// 	return await firestore.collection('Matches').doc(id).get()
	// 		.then(async documentSnapshot => {
	// 			const data = documentSnapshot.data()
	// 			await hydrate(data, ['teamA', 'teamB'])
	// 			await hydrate(data.teamA, ['players'])
	// 			await hydrate(data.teamB, ['players'])
	// 			data.id = id;
	// 			context.commit("setMatch", data)
	// 		})
	// },
	async getMatches(context) {
		return await firestore.collection('Matches').orderBy("beginTime", "desc").onSnapshot(querySnapshot => {
			const matches = querySnapshot.docs.map(doc => {
				return { id: doc.id, ...doc.data() };
			})
			context.commit('setMatches', matches)
		});
	},
	async getMatchesByDate(context) {
		let beginDate = Timestamp.fromDate(new Date(context.rootGetters.yearLow));
		let endDate = Timestamp.fromDate(new Date(context.rootGetters.yearHigh));
		return await firestore.collection('Matches').orderBy("beginTime", "desc").startAt(endDate).endAt(beginDate).onSnapshot(querySnapshot => {
			const matches = querySnapshot.docs.map(doc => {
				return { id: doc.id, ...doc.data() };
			})
			context.commit('setMatches', matches)
		});
	},
	// async addMatch(context, data) {
	// 	let obj = JSON.parse(JSON.stringify(data))
	// 	obj.beginTime = Timestamp.fromDate(new Date(obj.date + 'T' + obj.beginTime + 'Z'));
	// 	obj.endTime = Timestamp.fromDate(new Date(obj.date + 'T' + obj.endTime + 'Z'));
	// 	delete obj.date;
	// 	let Users = firestore.collection('Users');
	// 	let Players = firestore.collection('Players');
	// 	let Teams = firestore.collection('Teams');
	// 	let Matches = firestore.collection('Matches');
	// 	let Match = firestore.collection('Matches').doc()
	// 	let timeModified = Timestamp.fromDate(new Date());
	// 	let userModified = Users.doc(firestore._credentials.currentUser.uid);
	// 	let batch = firestore.batch();
	// 	let props = {
	// 		"props.dateModified": timeModified, "props.userModified": userModified, "props.lastOperation": "Add Match"
	// 	};
	// 	let init = { goals: 0, assists: 0, ownGoals: 0, penalties: 0, penaltiesFailed: 0 }
	// 	let highscores = {}
	// 	try {
	// 		obj.props = { dateCreated: timeModified, dateModified: timeModified, userCreated: userModified, userModified: userModified }
	// 		obj.teamA = Teams.doc(obj.teamA);
	// 		obj.teamB = Teams.doc(obj.teamB);
	// 		let playersFromTeam = (await obj.teamA.get()).data().players;
	// 		/**						Players					**/
	// 		for (let i = 0; i < playersFromTeam.length; i++) {
	// 			const player = Players.doc(playersFromTeam[i].id)
	// 			const playerData = (await player.get()).data();
	// 			highscores[playersFromTeam[i].id] = { "name": playerData.name, "nickname": playerData.nickname, "local": "home", ...init }
	// 			batch.update(player, { ...props, "counter.matches.total": increment, ['matches.' + [Match.id]]: true })
	// 		}
	// 		playersFromTeam = (await obj.teamB.get()).data().players;
	// 		for (let i = 0; i < playersFromTeam.length; i++) {
	// 			const player = Players.doc(playersFromTeam[i].id)
	// 			const playerData = (await player.get()).data();
	// 			highscores[playersFromTeam[i].id] = { "name": playerData.name, "nickname": playerData.nickname, "local": "away", ...init }
	// 			batch.update(player, { ...props, "counter.matches.total": increment, ['matches.' + [Match.id]]: true })
	// 		}
	// 		/**						Teams					**/
	// 		batch.update(obj.teamA, { ...props, "match": Matches.doc(Match.id) })
	// 		batch.update(obj.teamB, { ...props, "match": Matches.doc(Match.id) })
	// 		/** 					Match					**/
	// 		batch.set(Match, { ...obj, players: { ...highscores } });
	// 		await batch.commit();
	// 	}
	// 	catch (e) {
	// 		console.log(e);
	// 	}
	// },
	async addMatch({ rootState }, { formTeamA, formTeamB, formMatch }) {
		let objTeamA = JSON.parse(JSON.stringify(formTeamA))
		let objTeamB = JSON.parse(JSON.stringify(formTeamB))
		let objMatch = JSON.parse(JSON.stringify(formMatch))
		let Users = firestore.collection('Users');
		let Players = firestore.collection('Players')
		let Teams = firestore.collection('Teams');
		let Matches = firestore.collection('Matches');
		let TeamA = Teams.doc()
		let TeamB = Teams.doc()
		let Match = Matches.doc()
		let timeModified = Timestamp.fromDate(new Date());
		let userModified = Users.doc(rootState.user.uid);
		let batch = firestore.batch();
		let props = {
			"props.dateModified": timeModified, "props.userModified": userModified, "props.lastOperation": "Add Team"
		};
		let init = { goals: 0, assists: 0, ownGoals: 0, penalties: 0, penaltiesFailed: 0 }
		let highscores = {}
		/** 						Teams						**/
		try {
			objTeamA.match = Match;
			objTeamB.match = Match;
			objTeamA.props = { dateCreated: timeModified, dateModified: timeModified, userCreated: userModified, userModified: userModified, lastOperation: "Add Team" }
			objTeamB.props = { dateCreated: timeModified, dateModified: timeModified, userCreated: userModified, userModified: userModified, lastOperation: "Add Team" }
			for (let i = 0; i < objTeamA.players.length; i++) {
				const player = objTeamA.players[i]
				highscores[player.id] = { "name": player.name, "nickname": player.nickname, "local": "home", ...init }
				player = Players.doc(objTeamA.players[i].id)
				objTeamA.players[i] = player;
				batch.update(player, {
					...props, ["counter.teams." + [objTeamA.local]]: increment, ['teams.' + [TeamA.id]]: true
				})
			}
			for (let i = 0; i < objTeamB.players.length; i++) {
				const player = objTeamB.players[i]
				highscores[player.id] = { "name": player.name, "nickname": player.nickname, "local": "away", ...init }
				player = Players.doc(objTeamB.players[i].id)
				objTeamB.players[i] = player;
				batch.update(player, {
					...props, ["counter.teams." + [objTeamB.local]]: increment, ['teams.' + [TeamB.id]]: true
				})
			}
			batch.set(TeamA, objTeamA);
			batch.set(TeamB, objTeamB);

			/** 						Match						**/
			let begin = new Date(objMatch.date + 'T' + objMatch.beginTime + 'Z')
			let end = new Date(objMatch.date + 'T' + objMatch.endTime + 'Z')
			objMatch.beginTime = Timestamp.fromDate(begin);
			objMatch.endTime = Timestamp.fromDate(end);
			objMatch.durationMin = moment(end).diff(begin, 'minute');
			delete objMatch.date;

			props = {
				"props.dateModified": timeModified, "props.userModified": userModified, "props.lastOperation": "Add Match"
			};

			objMatch.props = { dateCreated: timeModified, dateModified: timeModified, userCreated: userModified, userModified: userModified, lastOperation: "Add Match" }
			objMatch.teamA = TeamA;
			objMatch.teamB = TeamB;

			/**						Players					**/
			for (let i = 0; i < objTeamA.players.length; i++) {
				batch.update(objTeamA.players[i], { ...props, "counter.matches.total": increment, ['matches.' + [Match.id]]: true })
			}
			for (let i = 0; i < objTeamB.players.length; i++) {
				batch.update(objTeamB.players[i], { ...props, "counter.matches.total": increment, ['matches.' + [Match.id]]: true })
			}
			batch.set(Match, { ...objMatch, players: { ...highscores } });
			await batch.commit();
		}
		catch (e) {
			console.log(e);
		}
		/** 					Match					**/
	},
	async editMatch({ state, rootState }) {
		let objMatch = JSON.parse(JSON.stringify(state.matchEdit))
		let Match = firestore.collection('Matches').doc(objMatch.id)
		delete objMatch.id;
		let timeModified = Timestamp.fromDate(new Date());
		let userModified = firestore.collection('Users').doc(rootState.user.uid);
		let props = {
			"props.dateModified": timeModified, "props.userModified": userModified, "props.lastOperation": "Edit Match"
		};
		try {
			let begin = new Date(objMatch.date + 'T' + objMatch.beginTime + 'Z')
			let end = new Date(objMatch.date + 'T' + objMatch.endTime + 'Z')
			objMatch.beginTime = Timestamp.fromDate(begin);
			objMatch.endTime = Timestamp.fromDate(end);
			objMatch.durationMin = moment(end).diff(begin, 'minute');
			delete objMatch.date;
			Match.update({ ...objMatch, ...props })
		}
		catch (e) {
			console.log(e);
		}
	},
	async delMatch({ state, rootState }) {
		let match = state.match;
		console.log(match)
		let Users = firestore.collection('Users');
		let Teams = firestore.collection('Teams');
		let Matches = firestore.collection('Matches');
		let TeamA = { id: match.teamA.id, ...(await (Teams.doc(match.teamA.id).get())).data() }
		let TeamB = { id: match.teamB.id, ...(await (Teams.doc(match.teamB.id).get())).data() }
		console.log(TeamA, TeamB)
		let Match = Matches.doc(match.id)
		let docSnapshot = await Match.get();
		if (!docSnapshot.exists) {
			return
		}
		let timeModified = Timestamp.fromDate(new Date());
		let userModified = Users.doc(rootState.user.uid);
		let batch = firestore.batch();
		let props = {
			"props.dateModified": timeModified, "props.userModified": userModified, "props.lastOperation": "Del Match"
		};
		try {
			/**						Players					**/
			for (let i = 0; i < TeamA.players.length; i++) {
				batch.update(TeamA.players[i], { ...props, "counter.matches.total": decrement, ['matches.' + [Match.id]]: deleteField, "counter.teams.home": decrement, ['teams.' + [TeamA.id]]: deleteField })
			}
			for (let i = 0; i < TeamB.players.length; i++) {
				batch.update(TeamB.players[i], { ...props, "counter.matches.total": decrement, ['matches.' + [Match.id]]: deleteField, "counter.teams.away": decrement, ['teams.' + [TeamB.id]]: deleteField })
			}
			/** 						Teams						**/
			batch.delete(match.teamA);
			batch.delete(match.teamB);
			/** 						Match						**/
			batch.delete(Match);
			await batch.commit();
		}
		catch (e) {
			console.log(e);
		}
	}
}