import { firestore, auth, Timestamp } from '../plugins/firebase'
import userParser from "../utils/userParser"

export default {
  fetch: function ({ redirect }) {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged(function (_user) {
        console.log('[INFO] Signin user: ', _user)
        if (_user) {
          console.log('[INFO] Signin user: ', _user)
          const user = userParser(_user);
          console.log(user)
          return resolve({ user })
        } else {
          redirect("/");
        }
      })
    })
  }
}
