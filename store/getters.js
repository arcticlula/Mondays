import moment from 'moment'
export default {
  activeUser(state) {
    return state.user
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
