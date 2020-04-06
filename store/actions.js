import { firestore, auth, google, Timestamp } from '../plugins/firebase'
import hydrate from "../utils/hydrate"
import loginParser from "../utils/loginParser"
import getCircularReplacer from "../utils/getCircularReplacer"

export default {
	async signOut({ commit }) {
		await auth.signOut()
		commit('setUser', null)
		commit('setUserDB', null)
		commit('setUserPlayer', null)
		this.$router.push('/login')
	},
	async googleSignIn({ dispatch }) {
		let loginInfo = await auth.signInWithPopup(google);
		await dispatch('addUser', loginInfo)
		// if (!loginInfo.isNewUser)
		this.$router.push('/')
		// else
		// 	this.$router.push('/choosePlayer')
	},
	async addUser({ commit }, loginInfo) {
		let UsersRef = firestore.collection('Users').doc(firestore._credentials.currentUser.uid);
		let Players = firestore.collection('Players')
		let timeModified = Timestamp.fromDate(new Date());
		UsersRef.get()
			.then((docSnapshot) => {
				if (docSnapshot.exists) {
					UsersRef.onSnapshot(async documentSnapshot => {
						let data = documentSnapshot.data();
						await hydrate(data, ['player'])
						let dob = data.player.dob ? data.player.dob.toDate().toLocaleDateString('pt-PT', { timeZone: 'UTC' }) : ''
						data.player = { ...data.player, dob: dob }
						data = JSON.parse(JSON.stringify(data, getCircularReplacer()))
						commit('setUserDB', data)
						commit('setUserPlayer', data.player)
					});
				} else {
					let profile = loginParser(loginInfo).profile
					UsersRef.set({ ...profile, player: null, admin: 0 })
				}
			});
		// try {
		// 	if (obj.dob) obj.dob = Timestamp.fromDate(new Date(obj.dob));
		// 	else obj.dob = Timestamp.fromDate(new Date('2000-01-01'))
		// 	obj.props = { dateCreated: timeModified, dateModified: timeModified, userCreated: userModified, userModified: userModified, lastOperation: "Add User" }
		// 	console.log(context, this)
		// 	Players.add(obj);
		// }
		// catch (e) {
		// 	console.log(e);
		// }
	}
}