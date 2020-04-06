import { firestore, Timestamp } from '../../plugins/firebase'

export default {
	async getPlayerById(context, id) {
		return await firestore.collection('Players').doc(id).onSnapshot(documentSnapshot => {
			context.commit('setPlayer', documentSnapshot.data())
		});
	},
	async getPlayers(context) {
		return await firestore.collection('Players').orderBy("name").onSnapshot(querySnapshot => {
			const players = querySnapshot.docs.map(doc => {
				return { id: doc.id, selected: false, ...doc.data() };
			})
			context.commit('setPlayers', players)
		});
	},
	async addPlayer(context, data) {
		let obj = JSON.parse(JSON.stringify(data))
		let Users = firestore.collection('Users');
		let Players = firestore.collection('Players')
		let timeModified = Timestamp.fromDate(new Date());
		let userModified = Users.doc(firestore._credentials.currentUser.uid);
		try {
			if (obj.dob) obj.dob = Timestamp.fromDate(new Date(obj.dob));
			else obj.dob = Timestamp.fromDate(new Date('2000-01-01'))
			obj.props = { dateCreated: timeModified, dateModified: timeModified, userCreated: userModified, userModified: userModified, lastOperation: "Add Player" }
			console.log(context, this)
			Players.add(obj);
		}
		catch (e) {
			console.log(e);
		}
	}
}