import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import config from '../config'

!firebase.apps.length ? firebase.initializeApp(config) : ''

export const Timestamp = firebase.firestore.Timestamp
export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const google = new firebase.auth.GoogleAuthProvider()
export default firebase