import { firestoreAction } from 'vuexfire'

export default {
	getMatchById: firestoreAction(async function ({ bindFirestoreRef }, id) {
		const db = this.$fireStore.collection('Matches').doc(id);
		await bindFirestoreRef('match', db, { wait: true })
	}),
	getMatches: firestoreAction(async function ({ bindFirestoreRef }) {
		const db = this.$fireStore.collection('Matches')
		await bindFirestoreRef('matches', db, { wait: true })
	}),
	getMatchesByDate: firestoreAction(async function (context) {
		let Timestamp = this.$fireStoreObj.Timestamp;
		let beginDate = Timestamp.fromDate(new Date(context.getters.yearLow));
		let endDate = Timestamp.fromDate(new Date(context.getters.yearHigh));
		let bindFirestoreRef = context.bindFirestoreRef;
		const db = this.$fireStore.collection('Matches').orderBy("beginTime").startAt(beginDate).endAt(endDate);
		await bindFirestoreRef('matches', db, { wait: true })
	}),
	setMatch: firestoreAction(async function (context, data) {
		let Timestamp = this.$fireStoreObj.Timestamp;
		let obj = JSON.parse(JSON.stringify(data))
		obj.beginTime = Timestamp.fromDate(new Date(obj.date + 'T' + obj.beginTime + 'Z'));
		obj.endTime = Timestamp.fromDate(new Date(obj.date + 'T' + obj.endTime + 'Z'));
		delete obj.date;
		let Users = this.$fireStore.collection('Users');
		let Players = this.$fireStore.collection('Players');
		let Teams = this.$fireStore.collection('Teams');
		let Matches = this.$fireStore.collection('Matches');
		let Match = this.$fireStore.collection('Matches').doc()
		let timeModified = Timestamp.fromDate(new Date());
		let userModified = Users.doc(this.$fireStore._credentials.currentUser.uid);
		let batch = this.$fireStore.batch();
		try {
			obj.props.dateCreated = timeModified
			obj.props.dateModified = timeModified
			obj.props.userCreated = userModified
			obj.props.userModified = userModified
			obj.teamA = Teams.doc(obj.teamA);
			obj.teamB = Teams.doc(obj.teamB);
			let team = await obj.teamA.get();
			let playersFromTeam = team.data().players;

			/**						Teams					**/
			batch.update(obj.teamA, {
				"props.dateModified": timeModified, "props.userModified": userModified, "match": Matches.doc(Match.id)
			})
			batch.update(obj.teamB, {
				"props.dateModified": timeModified, "props.userModified": userModified, "match": Matches.doc(Match.id)
			})
			/**						Players					**/
			for (let i = 0; i < playersFromTeam.length; i++) {
				const player = Players.doc(playersFromTeam[i].id)
				batch.update(player, {
					"props.dateModified": timeModified, "props.userModified": userModified, ['matches.' + [Match.id]]: true
				})
			}
			team = await obj.teamB.get();
			playersFromTeam = team.data().players;
			for (let i = 0; i < playersFromTeam.length; i++) {
				const player = Players.doc(playersFromTeam[i].id)
				batch.update(player, {
					"props.dateModified": timeModified, "props.userModified": userModified, ['matches.' + [Match.id]]: true
				})
			}
			/** 					Match					**/
			batch.set(Match, obj);
			await batch.commit();
		}
		catch (e) {
			console.log(e);
		}
	})
}