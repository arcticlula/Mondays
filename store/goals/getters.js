import moment from 'moment'
export default {
	hasGoals(state) {
		return _.isEmpty(state.goals) ? false : true
	}
}
