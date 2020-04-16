import { firestore, auth, google, Timestamp } from '../plugins/firebase'
import hydrate from "../utils/hydrate"
import loginParser from "../utils/loginParser"
import getCircularReplacer from "../utils/getCircularReplacer"
import { isEmpty } from "lodash";

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
		let res = await dispatch('loginUser', loginInfo)
		if (isEmpty(res.player) && !res.isVisitor) this.$router.push({ name: 'choosePlayer' })
		else this.$router.push({ name: 'index' })
	},
	async loginUser({ rootState, commit }, loginInfo) {
		let User = firestore.collection('Users').doc(rootState.user.uid);
		let timeModified = Timestamp.fromDate(new Date());
		let docSnapshot = await User.get();
		if (docSnapshot.exists) {
			let data = docSnapshot.data();
			// console.log(data)
			await hydrate(data, ['player'])
			if (!isEmpty(data.player)) data.player.dob = data.player.dob.toDate().toLocaleDateString('pt-PT', { timeZone: 'UTC' })
			data = JSON.parse(JSON.stringify(data, getCircularReplacer()))
			commit('setUserDB', data)
			commit('setUserPlayer', data.player)
			return data;
		}
		else {
			let profile = loginParser(loginInfo).profile
			let props = { dateCreated: timeModified, dateModified: timeModified, userCreated: User, userModified: User, lastOperation: "Add User" }
			let admin = {
				admin: false,
				players: { canAdd: false, canEdit: false },
				profile: { canEdit: false },
				users: { canEdit: false, canDelete: false },
				matches: { canAdd: false, canEdit: false, canDelete: false },
				players: { canAdd: false, canEdit: false },
				goals: { canAdd: false, canEdit: false, canDelete: false },
			}
			let data = { ...profile, player: null, admin: admin, props: props, isVisitor: false, isVerified: false }
			User.set(data)
			return data;
		}
	},
	async checkUser({ rootState, commit }) {
		let User = firestore.collection('Users').doc(rootState.user.uid);
		let docSnapshot = await User.get();
		if (docSnapshot.exists) {
			let data = docSnapshot.data();
			// console.log(data)
			await hydrate(data, ['player'])
			if (!isEmpty(data.player)) data.player.dob = data.player.dob.toDate().toLocaleDateString('pt-PT', { timeZone: 'UTC' })
			data = JSON.parse(JSON.stringify(data, getCircularReplacer()))
			commit('setUserDB', data)
			commit('setUserPlayer', data.player)
		}
	},
	async setPlayerUser({ rootState }, player) {
		let User = firestore.collection('Users').doc(rootState.user.uid);
		let Players = firestore.collection('Players')
		let timeModified = Timestamp.fromDate(new Date());
		let props = {
			"props.dateModified": timeModified, "props.userModified": User, "props.lastOperation": "Edit User"
		};
		let batch = firestore.batch();
		if (!isEmpty(player)) {
			let PlayerDB = Players.doc(player.id);
			batch.update(User, {
				...props, player: PlayerDB, isVisitor: false
			})
		}
		else {
			batch.update(User, {
				...props, player: null, isVisitor: true
			})
		}
		await batch.commit();
	}
}