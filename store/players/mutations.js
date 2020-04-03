import { vuexfireMutations } from 'vuexfire'

export default {
	...vuexfireMutations,
	setPlayerUser(state, data) {
		state.playerUser = data;
	},
	setPlayers(state, data) {
		state.players = data;
	}
}