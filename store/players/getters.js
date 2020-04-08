import moment from 'moment'
export default {
	dob(state) {
		return !_.isEmpty(state.player) ? moment(state.player.dob.toDate().toLocaleString('pt-PT', { timeZone: 'UTC' }), 'DD/MM/YYYY') : moment()
	}
}
