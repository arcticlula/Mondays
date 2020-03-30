import moment from 'moment'
export default {
    goalsHome(state) {
        return !!state.match ? state.match.counter.goalsHome : 0;
    },
    goalsAway(state) {
        return !!state.match ? state.match.counter.goalsAway : 0;
    },
    playersHome(state) {
        return !!state.match ? state.match.teamA.players : []
    },
    playersAway(state) {
        return !!state.match ? state.match.teamB.players : []
    },
    matchDate(state) {
        return !!state.match ? state.match.beginTime.toDate() : '';
    },
    highscoreTable(state) {
        let data = !!state.match ? state.match.players : {}
        return Object.keys(data).map(s => ({ id: s, name: data[s].name, goals: data[s].goals, assists: data[s].assists })).sort((a, b) => b.goals - a.goals);
    }
}
