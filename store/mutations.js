

export default {
	setUser(state, data) {
		state.user = data;
	},
	setUserDB(state, data) {
		state.userDB = data;
	},
	setNightMode(state, value) {
		state.nightMode = value;
		let element = document.getElementsByTagName("body")[0];
		value ? element.classList.add("moon") : element.classList.remove("moon")
	},
	setMonth(state) {
		state.navbar.month = "0";
	},
}