import { auth, google } from '../plugins/firebase'

export default {
	async signOut({ commit }) {
		await auth.signOut()
		commit('setUser', null)
		this.$router.push('/')
	},
	async googleSignIn({ commit }) {
		await auth.signInWithPopup(google);

		// if (!user.isNewUser)
		this.$router.push('/home')
		// else
		// 	this.$router.push('/choosePlayer')
	}
}