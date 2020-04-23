export default {
	setUser(state, data) {
		state.user = data;
	},
	setUserDB(state, data) {
		state.userDB = data;
	},
	setUserPlayer(state, data) {
		// console.log(data)
		state.userPlayer = data;
	},
	setMonth(state) {
		state.navbar.month = "0";
	},
}