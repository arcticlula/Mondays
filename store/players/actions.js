import { firestore, storage, Timestamp } from '../../plugins/firebase'

export default {
	async getPlayerById(context, id) {
		return await firestore.collection('Players').doc(id).onSnapshot(documentSnapshot => {
			context.commit('setPlayer', { id: id, ...documentSnapshot.data() })
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
	async addPlayer({ state }, data) {
		let obj = JSON.parse(JSON.stringify(data))
		let Users = firestore.collection('Users');
		let Players = firestore.collection('Players')
		let Player = Players.doc();
		let timeModified = Timestamp.fromDate(new Date());
		let userModified = Users.doc(firestore._credentials.currentUser.uid);
		let url = null;
		let batch = firestore.batch();
		try {
			if (obj.dob) obj.dob = Timestamp.fromDate(new Date(obj.dob));
			else obj.dob = Timestamp.fromDate(new Date('2000-01-01'))
			obj.props = { dateCreated: timeModified, dateModified: timeModified, userCreated: userModified, userModified: userModified, lastOperation: "Add Player" }
			delete obj.file
			if (Boolean(data.file)) {
				const storageRef = storage.ref(`players/${Player.id}`).put(data.file)
				await storageRef.then(async () => {
					await storageRef.snapshot.ref.getDownloadURL().then(async (res) => {
						url = res;
					})
				}
				)
			}
			batch.set(Player, { ...obj, picture: url });
			await batch.commit();
		}
		catch (e) {
			console.log(e);
		}
	},
	setPlayerPicture({ rootState }, { id, url }) {
		let Player = firestore.collection('Players').doc(id)
		let timeModified = Timestamp.fromDate(new Date());
		let userModified = firestore.collection('Users').doc(rootState.user.uid);
		let props = {
			"props.dateModified": timeModified, "props.userModified": userModified, "props.lastOperation": "Edit Player Picture"
		};
		try {
			Player.update({ picture: url, ...props })
		}
		catch (e) {
			console.log(e);
		}
	},
}