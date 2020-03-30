import moment from 'moment'
export default {
    userDob(state) {
        return state.playerUser.dob ? state.playerUser.dob.toDate() : ''
    },
}
