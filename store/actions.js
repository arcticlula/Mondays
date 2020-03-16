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
	bindPlayers: firestoreAction(async function ({ bindFirestoreRef }) {
		const db = this.$fireStore.collection('Players')//.doc('luis')
		await bindFirestoreRef('players', db, { wait: true })
	}),
	bindGoals: firestoreAction(async function ({ bindFirestoreRef }) {
		const db = this.$fireStore.collection('Goals')
		await bindFirestoreRef('goals', db, { wait: true })
	}),
	getMatchesByDate: firestoreAction(async function ({ bindFirestoreRef }) {
		const db = this.$fireStore.collection('Matches')
		await bindFirestoreRef('matches', db, { wait: true })
	}),
	getMatchById: firestoreAction(async function ({ bindFirestoreRef }, id) {
		const db = this.$fireStore.collection('Matches').doc(id);
		await bindFirestoreRef('match', db, { wait: true })
	})
}