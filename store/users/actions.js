import { firestore, Timestamp } from '../../plugins/firebase'
import hydrate from "../../utils/hydrate"
import asyncForEach from "../../utils/asyncForEach"

export default {
	async getUserById(context, id) {
		return await firestore.collection('Users').doc(id).onSnapshot(documentSnapshot => {
			context.commit('setUser', { id: id, ...documentSnapshot.data() })
		});
	},
	async getUsers(context) {
		return await firestore.collection('Users').orderBy("name").onSnapshot(async querySnapshot => {
			let users = []
			await asyncForEach(querySnapshot.docs, async doc => {
				let data = doc.data()
				await hydrate(data, ['player'])
				data.id = doc.id;
				users.push(data);
			})
			context.commit('setUsers', users)
		});
	}
}