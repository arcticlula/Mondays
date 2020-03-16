import firebase from 'firebase/app'
import 'firebase/auth'
import userParser from "../utils/userParser"

export default {
  fetch: function ({ redirect }) {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(function (_user) {
        if (_user) {
          console.log('[INFO] Signin user: ', _user)
          const user = userParser(_user);
          console.log(user)
          return resolve({ user })
        } else {
          redirect("/login");
        }
      })
    })
  }
}
