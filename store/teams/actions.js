import { firestoreAction } from 'vuexfire'

export default {
	getTeams: firestoreAction(async function ({ bindFirestoreRef }) {
		const db = this.$fireStore.collection('Teams')
		await bindFirestoreRef('teams', db, { wait: true })
	}),
	setTeam: firestoreAction(async function (context, data) {
		let Timestamp = this.$fireStoreObj.Timestamp;
		let obj = JSON.parse(JSON.stringify(data))
		let Users = this.$fireStore.collection('Users');
		let Players = this.$fireStore.collection('Players')
		let Team = this.$fireStore.collection('Teams').doc()
		let timeModified = Timestamp.fromDate(new Date());
		let userModified = Users.doc(this.$fireStore._credentials.currentUser.uid);
		let batch = this.$fireStore.batch();
		try {
			obj.props.dateCreated = timeModified
			obj.props.dateModified = timeModified
			obj.props.userCreated = userModified
			obj.props.userModified = userModified
			for (let i = 0; i < obj.players.length; i++) {
				const player = Players.doc(obj.players[i].id)
				obj.players[i] = player;
				batch.update(player, {
					"props.dateModified": timeModified, "props.userModified": userModified, ['teams.' + [Team.id]]: true
				})
			}
			batch.set(Team, obj);
			await batch.commit();
		}
		catch (e) {
			console.log(e);
		}
	})
}