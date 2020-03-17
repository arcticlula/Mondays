import { firestoreAction } from 'vuexfire'

export default {
	bindCountDocument: firestoreAction(async function ({ bindFirestoreRef }) {
		const db = this.$fireStore.collection('countCollection')
			.doc('countDocument')
		await bindFirestoreRef('countDocument', db, { wait: true })
	}),
	bindMatches: firestoreAction(async function ({ bindFirestoreRef }) {
		const db = this.$fireStore.collection('Matches')
		await bindFirestoreRef('matches', db, { wait: true })
	}),
	bindTeams: firestoreAction(async function ({ bindFirestoreRef }) {
		const db = this.$fireStore.collection('Teams')
		await bindFirestoreRef('teams', db, { wait: true })
	}),
	getPlayers: firestoreAction(async function ({ bindFirestoreRef }) {
		const db = this.$fireStore.collection('Players');
		await bindFirestoreRef('players', db, { wait: true })
	}),
	bindGoals: firestoreAction(async function ({ bindFirestoreRef }) {
		const db = this.$fireStore.collection('Goals')
		await bindFirestoreRef('goals', db, { wait: true })
	}),
	getMatchesByDate: firestoreAction(async function (context) {
		let Timestamp = this.$fireStoreObj.Timestamp;
		let beginDate = Timestamp.fromDate(new Date(context.getters.yearLow));
		let endDate = Timestamp.fromDate(new Date(context.getters.yearHigh));
		let bindFirestoreRef = context.bindFirestoreRef;
		const db = this.$fireStore.collection('Matches').orderBy("beginTime").startAt(beginDate).endAt(endDate);
		await bindFirestoreRef('matches', db, { wait: true })
	}),
	getMatchById: firestoreAction(async function ({ bindFirestoreRef }, id) {
		const db = this.$fireStore.collection('Matches').doc(id);
		await bindFirestoreRef('match', db, { wait: true })
	})
}