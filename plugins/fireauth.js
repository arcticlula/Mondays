import { auth } from './firebase.js'
import userParser from "../utils/userParser"

export default (context) => {
  const { store } = context

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      // console.log(user)
      // let temp = !_.isEmpty(user) ? userParser(user) : null
      store.commit('setUser', user)
      resolve()
    })
  })
}
