import firebase from 'firebase/app'
import 'firebase/auth'

import loginParser from "../../utils/loginParser"
export default {
	googleSignIn(context) {
		this.provider = new firebase.auth.GoogleAuthProvider()
		firebase
			.auth()
			.signInWithPopup(this.provider)
			.then((result) => {
				let user = loginParser(result);
				context.commit("setUser", user);
				if (!user.isNewUser)
					this.$router.push('/home')
				else
					this.$router.push('/choosePlayer')
			})
			.catch((e) => {
				this.$snotify.error(e.message)
				console.log(e)
			})
	}
}