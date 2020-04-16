import moment from 'moment'
import { isEmpty } from 'lodash'
export default {
	hasGoals(state) {
		return isEmpty(state.goals) ? false : true
	}
}
