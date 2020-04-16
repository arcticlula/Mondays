import moment from 'moment'
import { isEmpty } from "lodash";

export default {
	setMatch(state, data) {
		state.match = data;
		state.matchEdit = !isEmpty(state.match)
			?
			{
				id: state.match.id,
				date: moment(state.match.beginTime
					.toDate()
					.toLocaleDateString('pt-PT', { timeZone: 'UTC' }), "DD/MM/YYYY").format("YYYY-MM-DD"),
				beginTime: state.match.beginTime
					.toDate()
					.toLocaleTimeString('pt-PT', { timeZone: 'UTC' }),
				endTime: state.match.endTime
					.toDate()
					.toLocaleTimeString('pt-PT', { timeZone: 'UTC' })
			}
			: {}
	},
	setMatches(state, data) {
		state.matches = data;
	}
}