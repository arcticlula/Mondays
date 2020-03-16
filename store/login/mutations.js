import { vuexfireMutations } from 'vuexfire'

export default {
	setUser(state, data) {
		console.log(data)
		state.user = data;
	}
}