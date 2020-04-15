import { auth } from './firebase.js'
import userParser from "../utils/userParser"

export default (context) => {
  const { store } = context

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      console.log(user)
      store.commit('setUser', user)
      resolve()
    })
  })
  // auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  //   .then(function () {
  //     // Existing and future Auth states are now persisted in the current
  //     // session only. Closing the window would clear any existing state even
  //     // if a user forgets to sign out.
  //     // ...
  //     // New sign-in will be persisted with session persistence.
  //     return auth.signInWithEmailAndPassword(email, password);
  //   })
  //   .catch(function (error) {
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //   });
}
