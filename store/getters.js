import moment from 'moment'
import { isEmpty } from 'lodash'
export default {
  editionMode(state) {
    // return true
    return state.mode.edition
  },
  admin(state) {
    return !isEmpty(state.userDB) ? state.userDB.admin.admin : false
  },
  adminPlayers(state) {
    return !isEmpty(state.userDB) ? state.userDB.admin.players : {}
  },
  adminMatches(state) {
    return !isEmpty(state.userDB) ? state.userDB.admin.matches : {}
  },
  adminGoals(state) {
    return !isEmpty(state.userDB) ? state.userDB.admin.goals : {}
  },
  adminUsers(state) {
    return !isEmpty(state.userDB) ? state.userDB.admin.users : {}
  },
  adminProfile(state) {
    return !isEmpty(state.userDB) ? state.userDB.admin.profile : {}
  },
  canAddMatch(state, getters) {
    return getters.editionMode ? getters.adminMatches.canAdd : false;
  },
  canEditMatch(state, getters) {
    return getters.editionMode ? getters.adminMatches.canEdit : false;
  },
  canDeleteMatch(state, getters) {
    return getters.editionMode ? getters.adminMatches.canDelete : false;
  },
  canAddGoals(state, getters) {
    return getters.editionMode ? getters.adminGoals.canAdd : false;
  },
  canEditGoals(state, getters) {
    return getters.editionMode ? getters.adminGoals.canEdit : false;
  },
  canDeleteGoals(state, getters) {
    return getters.editionMode ? getters.adminGoals.canDelete : false;
  },
  canAddPlayer(state, getters) {
    return getters.editionMode ? getters.adminPlayers.canAdd : false;
  },
  canEditPlayer(state, getters) {
    return getters.editionMode ? getters.adminPlayers.canEdit : false;
  },
  canEditUser(state, getters) {
    return getters.editionMode ? getters.adminUsers.canEdit : false;
  },
  canDeleteUser(state, getters) {
    return getters.editionMode ? getters.adminUsers.canDelete : false;
  },
  canEditProfile(state, getters) {
    return getters.editionMode ? getters.adminProfile.canEdit : false;
  },
  userDB(state) {
    return !isEmpty(state.userDB) ? state.userDB : {}
  },
  isVisitor(state) {
    return !isEmpty(state.userDB) ? state.userDB.isVisitor : true
  },
  dob(state) {
    return !isEmpty(state.userPlayer) ? moment(state.userPlayer.dob, 'DD/MM/YYYY') : moment()
  },
  userPlayer(state) {
    // console.log(state)
    return !isEmpty(state.userPlayer) ? state.userPlayer : {}
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
