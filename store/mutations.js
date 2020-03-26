import { vuexfireMutations } from 'vuexfire'
import loginParser from "../utils/loginParser"

export default {
	...vuexfireMutations,
	setUser(state, data) {
		state.user = data;
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