export default {
	setGoals(state, data) {
		state.goals = data.slice();
		console.log(state.goals)
	}
}