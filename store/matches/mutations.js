import { vuexfireMutations } from 'vuexfire'

export default {
	...vuexfireMutations,
	setMatch(state, data) {
		state.match = data;
	},
	setMatches(state, data) {
		state.matches = data;
	}
}