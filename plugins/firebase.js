import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

!firebase.apps.length ? firebase.initializeApp({
	apiKey: process.env.API_KEY,
	authDomain: process.env.AUTH_DOMAIN,
	databaseURL: process.env.DATABASE_URL,
	projectId: process.env.PROJECT_ID,
	storageBucket: process.env.STORAGE_BUCKET,
	messagingSenderId: process.env.MESSAGING_SENDER_ID,
	appId: process.env.APP_ID,
	measurementId: process.env.MEASUREMENT_ID
}) : ''

export const Timestamp = firebase.firestore.Timestamp
export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const storage = firebase.storage()

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