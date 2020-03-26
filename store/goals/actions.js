import { firestoreAction } from 'vuexfire'
import { firestore, Timestamp } from '../../plugins/firebase'
import moment from 'moment';

export default {
	getGoals: firestoreAction(async function ({ bindFirestoreRef }) {
		const db = firestore.collection('Goals')
		await bindFirestoreRef('goals', db, { wait: true })
	}),
	getGoalsFromMatch: firestoreAction(async function ({ bindFirestoreRef }, id) {
		let Goals = firestore.collection('Goals');
		let Match = firestore.collection('Matches').doc(id);
		const db = Goals.where("match", "==", Match).orderBy('timeMin')
		await bindFirestoreRef('goals', db, { wait: true })
	}),
	setGoal: firestoreAction(async function (context, data) {
		let obj = JSON.parse(JSON.stringify(data))
		let Users = firestore.collection('Users');
		let Players = firestore.collection('Players');
		let Teams = firestore.collection('Teams');
		let Matches = firestore.collection('Matches');
		let Match = await Matches.doc(obj.match).get();
		let Goal = firestore.collection('Goals').doc()
		let timeModified = Timestamp.fromDate(new Date());
		let userModified = Users.doc(firestore._credentials.currentUser.uid);
		let batch = firestore.batch();
		try {
			obj.props.dateCreated = timeModified
			obj.props.dateModified = timeModified
			obj.props.userCreated = userModified
			obj.props.userModified = userModified
			let date = moment(Match.data().beginTime.toDate())
			let dateGoal = new Date(date.format('YYYY-MM-DD') + 'T' + obj.time + 'Z');
			obj.time = Timestamp.fromDate(dateGoal);
			obj.timeMin = moment(dateGoal).diff(date, 'minute');

			switch (obj.type) {
				case "O":
					obj.isOwnGoal = true;
					obj.isPenalty = false;
					break;
				case "P":
					obj.isOwnGoal = false;
					obj.isPenalty = true;
					break;
				default:
					obj.isOwnGoal = false;
					obj.isPenalty = false;
					break;
			}
			delete obj.type;
			console.log(obj)
			// /**						Players					**/
			if (!!obj.goal) {
				obj.goal = Players.doc(obj.goal)
				batch.update(obj.goal, {
					"props.dateModified": timeModified, "props.userModified": userModified, ['goals.' + [Goal.id]]: true
				})
			}
			if (!!obj.assist) {
				obj.assist = Players.doc(obj.assist)
				batch.update(obj.assist, {
					"props.dateModified": timeModified, "props.userModified": userModified, ['assists.' + [Goal.id]]: true
				})
			}
			/**						Teams					**/
			if (!!obj.team) {
				obj.team = Teams.doc(obj.team);
				batch.update(obj.team, {
					"props.dateModified": timeModified, "props.userModified": userModified, ['goals.' + [Goal.id]]: true
				})
			}

			/** 					Match					**/
			if (!!obj.match) {
				obj.match = Matches.doc(obj.match);
				batch.update(obj.match, {
					"props.dateModified": timeModified, "props.userModified": userModified, ['goals.' + [Goal.id]]: true
				})
			}
			/** 					Goals					**/
			batch.set(Goal, obj);
			await batch.commit();
		}
		catch (e) {
			console.log(e);
		}
	}),
	delGoal: firestoreAction(async function (context, id) {
		let obj = JSON.parse(JSON.stringify(data))
		let Users = firestore.collection('Users');
		let Players = firestore.collection('Players');
		let Teams = firestore.collection('Teams');
		let Matches = firestore.collection('Matches');
		let Match = await Matches.doc(obj.match).get();
		let Goal = firestore.collection('Goals').doc(id)
		let timeModified = Timestamp.fromDate(new Date());
		let userModified = Users.doc(firestore._credentials.currentUser.uid);
		let lastOperation = 'Delete Goal';
		let batch = firestore.batch();
		try {
			/**						Goal					**/
			batch.delete(Goal)
			/**						Players					**/
			if (!!obj.goal) {
				obj.goal = Players.doc(obj.goal)
				batch.update(obj.goal, {
					"props.dateModified": timeModified, "props.userModified": userModified, "props.lastOperation": lastOperation
				})
				batch.delete(obj.goal['goals.' + [Goal.id]])
			}
			if (!!obj.assist) {
				obj.assist = Players.doc(obj.assist)
				batch.update(obj.assist, {
					"props.dateModified": timeModified, "props.userModified": userModified, ['assists.' + [Goal.id]]: true
				})
			}
			/**						Teams					**/
			if (!!obj.team) {
				obj.team = Teams.doc(obj.team);
				batch.update(obj.team, {
					"props.dateModified": timeModified, "props.userModified": userModified, ['goals.' + [Goal.id]]: true
				})
			}

			/** 					Match					**/
			if (!!obj.match) {
				obj.match = Matches.doc(obj.match);
				batch.update(obj.match, {
					"props.dateModified": timeModified, "props.userModified": userModified, ['goals.' + [Goal.id]]: true
				})
			}
			/** 					Goals					**/
			// await batch.commit();
		}
		catch (e) {
			console.log(e);
		}
	})
}