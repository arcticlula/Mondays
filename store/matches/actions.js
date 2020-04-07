import { firestore, Timestamp, increment } from '../../plugins/firebase'
import hydrate from "../../utils/hydrate"
import asyncForEach from "../../utils/asyncForEach"
import getCircularReplacer from "../../utils/getCircularReplacer"

export default {
	async getMatchById(context, id) {
		return await firestore.collection('Matches').doc(id).onSnapshot(documentSnapshot => {
			context.commit('setMatch', documentSnapshot.data())
		});
	},
	async getMatchByIdStatic(context, id) {
		return await firestore.collection('Matches').doc(id).get()
			.then(async documentSnapshot => {
				const data = documentSnapshot.data()
				await hydrate(data, ['teamA', 'teamB'])
				await hydrate(data.teamA, ['players'])
				await hydrate(data.teamB, ['players'])
				data.id = id;
				context.commit("setMatch", data)
			})
	},
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
		return await firestore.collection('Matches').orderBy("beginTime").startAt(beginDate).endAt(endDate).onSnapshot(querySnapshot => {
			const matches = querySnapshot.docs.map(doc => {
				return { id: doc.id, ...doc.data() };
			})
			context.commit('setMatches', matches)
		});
	},
	// async getMatchesByDateFromPlayer(context, id) {
	// 	let beginDate = Timestamp.fromDate(new Date(context.rootGetters.yearLow));
	// 	let endDate = Timestamp.fromDate(new Date(context.rootGetters.yearHigh));

	// 	return await firestore.collection('Matches').onSnapshot(querySnapshot => {
	// 		// const matches = querySnapshot.docs.map(doc => {
	// 		// 	return { id: doc.id, ...doc.data() };
	// 		// })
	// 		// context.commit('setMatches', matches)
	// 	});
	// },
	async addMatch(context, data) {
		let obj = JSON.parse(JSON.stringify(data))
		obj.beginTime = Timestamp.fromDate(new Date(obj.date + 'T' + obj.beginTime + 'Z'));
		obj.endTime = Timestamp.fromDate(new Date(obj.date + 'T' + obj.endTime + 'Z'));
		delete obj.date;
		let Users = firestore.collection('Users');
		let Players = firestore.collection('Players');
		let Teams = firestore.collection('Teams');
		let Matches = firestore.collection('Matches');
		let Match = firestore.collection('Matches').doc()
		let timeModified = Timestamp.fromDate(new Date());
		let userModified = Users.doc(firestore._credentials.currentUser.uid);
		let batch = firestore.batch();
		let props = {
			"props.dateModified": timeModified, "props.userModified": userModified, "props.lastOperation": "Add Match"
		};
		let init = { goals: 0, assists: 0, ownGoals: 0, penalties: 0 }
		let highscores = {}
		try {
			obj.props = { dateCreated: timeModified, dateModified: timeModified, userCreated: userModified, userModified: userModified }
			obj.teamA = Teams.doc(obj.teamA);
			obj.teamB = Teams.doc(obj.teamB);
			let playersFromTeam = (await obj.teamA.get()).data().players;
			/**						Players					**/
			for (let i = 0; i < playersFromTeam.length; i++) {
				const player = Players.doc(playersFromTeam[i].id)
				const playerData = (await player.get()).data();
				highscores[playersFromTeam[i].id] = { "name": playerData.name, "nickname": playerData.nickname, "local": "home", ...init }
				batch.update(player, { ...props, "counter.matches.total": increment, ['matches.' + [Match.id]]: true })
			}
			playersFromTeam = (await obj.teamB.get()).data().players;
			for (let i = 0; i < playersFromTeam.length; i++) {
				const player = Players.doc(playersFromTeam[i].id)
				const playerData = (await player.get()).data();
				highscores[playersFromTeam[i].id] = { "name": playerData.name, "nickname": playerData.nickname, "local": "away", ...init }
				batch.update(player, { ...props, "counter.matches.total": increment, ['matches.' + [Match.id]]: true })
			}
			/**						Teams					**/
			batch.update(obj.teamA, { ...props, "match": Matches.doc(Match.id) })
			batch.update(obj.teamB, { ...props, "match": Matches.doc(Match.id) })
			/** 					Match					**/
			batch.set(Match, { ...obj, players: { ...highscores } });
			await batch.commit();
		}
		catch (e) {
			console.log(e);
		}
	},
	async addTeamsMatch({ rootState }, { formTeamA, formTeamB, formMatch }) {
		let objTeamA = JSON.parse(JSON.stringify(formTeamA), getCircularReplacer())
		let objTeamB = JSON.parse(JSON.stringify(formTeamB), getCircularReplacer())
		let objMatch = JSON.parse(JSON.stringify(formMatch), getCircularReplacer())
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
		let init = { goals: 0, assists: 0, ownGoals: 0, penalties: 0 }
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
		}
		catch (e) {
			console.log(e);
		}
		/** 						Match						**/
		objMatch.beginTime = Timestamp.fromDate(new Date(objMatch.date + 'T' + objMatch.beginTime + 'Z'));
		objMatch.endTime = Timestamp.fromDate(new Date(objMatch.date + 'T' + objMatch.endTime + 'Z'));
		delete objMatch.date;

		props = {
			"props.dateModified": timeModified, "props.userModified": userModified, "props.lastOperation": "Add Match"
		};

		try {
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
		}
		catch (e) {
			console.log(e);
		}
		/** 					Match					**/
		await batch.commit();
	}
}