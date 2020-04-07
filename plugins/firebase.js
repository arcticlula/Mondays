import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import config from '../config'

!firebase.apps.length ? firebase.initializeApp(config) : ''

export const Timestamp = firebase.firestore.Timestamp
export const auth = firebase.auth()
export const firestore = firebase.firestore()
// console.log("Enable Persistence")
// firebase.firestore().enablePersistence().catch(function (err) {
// 	console.log(err.code)
// 	// if (err.code == 'failed-precondition') {
// 	// 	console.log()
// 	// } else if (err.code == 'unimplemented') {
// 	// 	console.log()
// 	// }
// });
export const increment = firebase.firestore.FieldValue.increment(1);
export const decrement = firebase.firestore.FieldValue.increment(-1);
export const deleteField = firebase.firestore.FieldValue.delete();
export const google = new firebase.auth.GoogleAuthProvider()
export default firebase