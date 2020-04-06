import moment from 'moment'
import lodash from 'lodash'
export default {
  admin(state) {
    return !_.isEmpty(state.userDB) ? state.userDB.admin : 0
  },
  userDB(state) {
    return !_.isEmpty(state.userDB) ? state.userDB : {}
  },
  userDob(state) {
    return !_.isEmpty(state.userPlayer) ? moment(state.userPlayer.dob, 'DD/MM/YYYY') : moment()
  },
  userPlayer(state) {
    return !_.isEmpty(state.userPlayer) ? state.userPlayer : {}
  },
  yearHigh(state) {
    let date = state.navbar;
    if (date.year == moment().format("YYYY-MM-DD")) return date.year;
    else if (date.month == "0") {
      return moment(date.year).add(1, "year").format("YYYY-MM-DD");
    }
    else return moment(date.year).set('month', date.month).format("YYYY-MM-DD");
  },
  yearLow(state) {
    let date = state.navbar;
    if (date.year == moment().format("YYYY-MM-DD")) return moment(state.firstYear).format('YYYY-MM-DD');
    else if (date.month == "0") {
      return moment(date.year).format("YYYY-MM-DD");
    }
    else return moment(date.year).set('month', parseInt(date.month) - 1).format("YYYY-MM-DD");
  }
}
