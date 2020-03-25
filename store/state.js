import moment from 'moment'

export default () => ({
  firstYear: '2018-09-01',
  navbar: { month: "0", year: moment().format('M') >= 9 ? moment().format("YYYY-09-01") : moment().subtract(1, "year").format("YYYY-09-01") },
  nightMode: false
})
