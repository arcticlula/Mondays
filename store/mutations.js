
import { vuexfireMutations } from 'vuexfire'

export default {
	...vuexfireMutations,
	setUser(state, data) {
		state.user = data;
	},
	setUserDB(state, data) {
		state.userDB = data;
	},
	setUserPlayer(state, data) {
		state.userPlayer = data;
	},
	setNightMode(state, value) {
		state.mode.night = value;
		let element = document.getElementsByTagName("body")[0];
		value ? element.classList.add("moon") : element.classList.remove("moon")
	},
	setMonth(state) {
		state.navbar.month = "0";
	},
}