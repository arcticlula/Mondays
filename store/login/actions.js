import { auth, google } from '../../plugins/firebase'

import loginParser from "../../utils/loginParser"
export default {
	async logout({ commit }) {
		await auth.signOut()
		commit.setUser(null)
	},
	async googleSignIn({ commit }) {
		let _user = await auth.signInWithPopup(google);
		let user = loginParser(_user);
		console.log(_user)
		commit("setUser", user);
		if (!user.isNewUser)
			this.$router.push('/home')
		else
			this.$router.push('/choosePlayer')
	}
}