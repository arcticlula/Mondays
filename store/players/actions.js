import { firestoreAction } from 'vuexfire'

export default {
	getPlayers: firestoreAction(async function ({ bindFirestoreRef }) {
		const db = this.$fireStore.collection('Players').orderBy('name');
		await bindFirestoreRef('players', db, { wait: true })
	}),
	getPlayersStatic() {
		return this.$fireStore.collection('Players').orderBy('name').get().then(function (querySnapshot) {
			return querySnapshot.docs.map(doc => {
				let obj = doc.data()
				obj.selected = false;
				obj.id = doc.id;
				return obj
			})
		});
	},
	setPlayer: firestoreAction(async function (context, data) {
		let Timestamp = this.$fireStoreObj.Timestamp;
		let obj = JSON.parse(JSON.stringify(data))
		let Users = this.$fireStore.collection('Users');
		let Players = this.$fireStore.collection('Players')
		let timeModified = Timestamp.fromDate(new Date());
		let userModified = Users.doc(this.$fireStore._credentials.currentUser.uid);
		try {
			if (obj.dob) obj.dob = Timestamp.fromDate(new Date(obj.dob));
			else obj.dob = Timestamp.fromDate(new Date('2000-01-01'))
			obj.props.dateCreated = timeModified
			obj.props.dateModified = timeModified
			obj.props.userCreated = userModified
			obj.props.userModified = userModified
			console.log(context, this)
			Players.add(obj);
		}
		catch (e) {
			console.log(e);
		}
	})
}