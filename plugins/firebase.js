import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import config from '../config'

!firebase.apps.length ? firebase.initializeApp(config) : ''
console.log("hello")

export const Timestamp = firebase.firestore.Timestamp
export const auth = firebase.auth()
export const userID = auth.currentUser
export const firestore = firebase.firestore()
export const increment = firebase.firestore.FieldValue.increment(1);
export const decrement = firebase.firestore.FieldValue.increment(-1);
export const deleteField = firebase.firestore.FieldValue.delete();
export const google = new firebase.auth.GoogleAuthProvider()
export default firebase