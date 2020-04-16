import moment from 'moment'
import { isEmpty } from 'lodash'
export default {
	dob(state) {
		return !isEmpty(state.player) ? moment(state.player.dob.toDate().toLocaleString('pt-PT', { timeZone: 'UTC' }), 'DD/MM/YYYY') : moment()
	}
}
