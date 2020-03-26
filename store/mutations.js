import { vuexfireMutations } from 'vuexfire'
import loginParser from "../utils/loginParser"

export default {
	...vuexfireMutations,
	setUser(state, data) {
		state.user = data;
	},
	setNightMode(state, value) {
		state.nightMode = value;
		let element = document.getElementsByTagName("body")[0];
		value ? element.classList.add("moon") : element.classList.remove("moon")
	},
	changeCount(state, amount) {
		const increment = this.$fireStoreObj.FieldValue.increment(amount)
		this.$fireStore
			.collection('countCollection')
			.doc('countDocument')
			.update({ count: increment })
	},
	setMonth(state) {
		state.navbar.month = "0";
	},
}