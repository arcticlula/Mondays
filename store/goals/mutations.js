import moment from 'moment'
import { isEmpty } from "lodash";

export default {
	setGoal(state, data) {
		state.goal = data;
		let date = moment(data.time
			.toDate()
			.toLocaleString('pt-PT', { timeZone: 'UTC' }), "DD/MM/YYYY, HH:mm:ss")
		state.goalEdit = {
			id: data.id,
			datetime: date.format("YYYY-MM-DD"),
			time: date.format('HH:mm:ss'),
			timeMin: data.timeMin,
			URLLink: data.url ? data.url.link : '',
			URLTime: data.url ? data.url.time : '00:00:00'
		}
	},
	setGoals(state, data) {
		state.goals = data.slice();
	}
}