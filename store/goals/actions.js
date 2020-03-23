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
		const db = Goals.where("match", "==", Match)
		await bindFirestoreRef('goals', db, { wait: true })
	}),
	setGoal: firestoreAction(async function (context, data) {
		let Timestamp = this.$fireStoreObj.Timestamp;
		let obj = JSON.parse(JSON.stringify(data))
		let Users = this.$fireStore.collection('Users');
		let Players = this.$fireStore.collection('Players');
		let Teams = this.$fireStore.collection('Teams');
		let Match = this.$fireStore.collection('Matches').doc(obj.match);
		let MatchData = await Match.get();
		let Goal = this.$fireStore.collection('Goals').doc()
		let timeModified = Timestamp.fromDate(new Date());
		let userModified = Users.doc(this.$fireStore._credentials.currentUser.uid);
		let batch = this.$fireStore.batch();
		try {
			obj.props.dateCreated = timeModified
			obj.props.dateModified = timeModified
			obj.props.userCreated = userModified
			obj.props.userModified = userModified
			let date = moment(MatchData.data().beginTime.toDate())
			let dateGoal = new Date(date.format('YYYY-MM-DD') + 'T' + obj.time + 'Z');
			obj.time = Timestamp.fromDate(dateGoal);
			obj.timeMin = moment(dateGoal).diff(date, 'minute');
			obj.match = Match;
			obj.team = Teams.doc(obj.team);
			obj.goal = !!obj.goal ? Players.doc(obj.goal) : null;
			obj.assist = !!obj.assist ? Players.doc(obj.assist) : null;
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
			/**						Teams					**/
			// batch.update(obj.teamA, {
			// 	"props.dateModified": timeModified, "props.userModified": userModified, "match": Matches.doc(Match.id)
			// })
			// batch.update(obj.teamB, {
			// 	"props.dateModified": timeModified, "props.userModified": userModified, "match": Matches.doc(Match.id)
			// })
			// /**						Players					**/
			// for (let i = 0; i < playersFromTeam.length; i++) {
			// 	const player = Players.doc(playersFromTeam[i].id)
			// 	batch.update(player, {
			// 		"props.dateModified": timeModified, "props.userModified": userModified, ['matches.' + [Match.id]]: true
			// 	})
			// }
			// team = await obj.teamB.get();
			// playersFromTeam = team.data().players;
			// for (let i = 0; i < playersFromTeam.length; i++) {
			// 	const player = Players.doc(playersFromTeam[i].id)
			// 	batch.update(player, {
			// 		"props.dateModified": timeModified, "props.userModified": userModified, ['matches.' + [Match.id]]: true
			// 	})
			// }
			/** 					Match					**/
			batch.set(Goal, obj);
			await batch.commit();
		}
		catch (e) {
			console.log(e);
		}
	})
}