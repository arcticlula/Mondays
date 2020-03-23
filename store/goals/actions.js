import { firestoreAction } from 'vuexfire'
import moment from 'moment';

export default {
	getGoals: firestoreAction(async function ({ bindFirestoreRef }) {
		const db = this.$fireStore.collection('Goals')
		await bindFirestoreRef('goals', db, { wait: true })
	}),
	getGoalsFromMatch: firestoreAction(async function ({ bindFirestoreRef }, id) {
		let Goals = this.$fireStore.collection('Goals');
		let Match = this.$fireStore.collection('Matches').doc(id);
		const db = Goals.where("match", "==", Match).orderBy('timeMin')
		await bindFirestoreRef('goals', db, { wait: true })
	}),
	setGoal: firestoreAction(async function (context, data) {
		let Timestamp = this.$fireStoreObj.Timestamp;
		let obj = JSON.parse(JSON.stringify(data))
		let Users = this.$fireStore.collection('Users');
		let Players = this.$fireStore.collection('Players');
		let Teams = this.$fireStore.collection('Teams');
		let Matches = this.$fireStore.collection('Matches');
		let Match = await Matches.doc(obj.match).get();
		let Goal = this.$fireStore.collection('Goals').doc()
		let timeModified = Timestamp.fromDate(new Date());
		let userModified = Users.doc(this.$fireStore._credentials.currentUser.uid);
		let batch = this.$fireStore.batch();
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
	})
}