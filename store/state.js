import moment from 'moment'

export default () => ({
  user: null,
  userDB: {},
  userPlayer: {},
  mode: { edition: false, night: false, playedMatchesOnly: false },
  firstYear: '2018-09-01',
  navbar: { month: "0", year: moment().format('M') >= 9 ? moment().format("YYYY-09-01") : moment().subtract(1, "year").format("YYYY-09-01") },
  modal: { showGoal: false, showMatch: false },
  highscore: { showOG: false, showP: false, showPF: false }
})
