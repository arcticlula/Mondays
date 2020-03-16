import { vuexfireMutations } from 'vuexfire'

export default {
	...vuexfireMutations,
	changeCount(state, amount) {
		const increment = this.$fireStoreObj.FieldValue.increment(amount)
		this.$fireStore
			.collection('countCollection')
			.doc('countDocument')
			.update({ count: increment })
	},
	setMonth(state) {
		state.navbar.month = "0";
	}
}