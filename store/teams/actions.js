import { firestoreAction } from 'vuexfire'
import { firestore, Timestamp, increment } from '../../plugins/firebase'

export default {
	getTeams: firestoreAction(async function ({ bindFirestoreRef }) {
		const db = firestore.collection('Teams')
		await bindFirestoreRef('teams', db, { wait: true })
	}),
	async setTeam(context, data) {
		let obj = JSON.parse(JSON.stringify(data))
		let Users = firestore.collection('Users');
		let Players = firestore.collection('Players')
		let Team = firestore.collection('Teams').doc()
		let timeModified = Timestamp.fromDate(new Date());
		let userModified = Users.doc(firestore._credentials.currentUser.uid);
		let batch = firestore.batch();
		let props = {
			"props.dateModified": timeModified, "props.userModified": userModified
		};
		try {
			obj.props = { dateCreated: timeModified, dateModified: timeModified, userCreated: userModified, userModified: userModified }
			for (let i = 0; i < obj.players.length; i++) {
				const player = Players.doc(obj.players[i].id)
				obj.players[i] = player;
				batch.update(player, {
					...props, ["counter.teams." + [obj.local]]: increment, ['teams.' + [Team.id]]: true
				})
			}
			batch.set(Team, obj);
			await batch.commit();
		}
		catch (e) {
			console.log(e);
		}
	}
}