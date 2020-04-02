import { vuexfireMutations } from 'vuexfire'

export default {
	...vuexfireMutations,
	setGoals(state, data) {
		state.goals = data.slice();
		console.log(state.goals)
	}
}