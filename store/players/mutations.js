import { firestore, Timestamp } from '../../plugins/firebase'

export default {
	setPlayer(state, data) {
		state.player = data;
	},
	setPlayers(state, data) {
		state.players = data;
	}
}