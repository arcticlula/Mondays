import { auth } from './firebase.js'

export default (context) => {
  const { store } = context

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      console.log(user)
      store.commit('setUser', user)
      resolve()
    })
  })
}
