import moment from 'moment'
import { isEmpty } from "lodash";

export default {
    goalsHome(state) {
        return !isEmpty(state.match) ? state.match.counter.goals.home : 0;
    },
    goalsAway(state) {
        return !isEmpty(state.match) ? state.match.counter.goals.away : 0;
    },
    playersHome(state) {
        let data = !isEmpty(state.match) ? state.match.players : {}
        return Object.keys(data).reduce((filtered, s) => {
            if (data[s].local == 'home') {
                filtered.push({ id: s, name: data[s].name, nickname: data[s].nickname })
            }
            return filtered
        }, [])
    },
    playersAway(state) {
        let data = !isEmpty(state.match) ? state.match.players : {}
        return Object.keys(data).reduce((filtered, s) => {
            if (data[s].local == 'away') {
                filtered.push({ id: s, name: data[s].name, nickname: data[s].nickname })
            }
            return filtered
        }, [])
    },
    matchDate(state) {
        return !isEmpty(state.match)
            ? moment(
                state.match.beginTime
                    .toDate()
                    .toLocaleString('pt-PT', { timeZone: 'UTC' }),
                'DD/MM/YYYY, HH:mm:ss'
            )
            : moment()
    },
    highscorePlayed(state, getters, rootState) {
        let matches = rootState.mode.playedMatchesOnly
            ? !isEmpty(state.matches) && !isEmpty(rootState.userPlayer)
                ? state.matches.filter((s) => s.players[rootState.userPlayer.id])
                : []
            : !isEmpty(state.matches) ? state.matches : []
        let res = matches.reduce((hash, data) => {
            const players = data.players;
            Object.keys(players).map(key => {
                const goalDiff = players[key].local == 'home' ? data.counter.goals.home - data.counter.goals.away : data.counter.goals.away - data.counter.goals.home;
                if (!hash[key]) {
                    hash[key] = { id: key, matches: 0, wins: 0, draws: 0, losses: 0, assists: 0, goals: 0, local: players[key].local, name: players[key].name, nickname: players[key].nickname, ownGoals: 0, penalties: 0, penaltiesFailed: 0 };
                }
                hash[key].assists += players[key].assists;
                hash[key].goals += players[key].goals;
                hash[key].ownGoals += players[key].ownGoals;
                hash[key].penalties += players[key].penalties;
                hash[key].penaltiesFailed += players[key].penaltiesFailed;
                hash[key].matches++
                if (goalDiff > 0) hash[key].wins++;
                if (goalDiff < 0) hash[key].losses++;
                else if (goalDiff == 0) hash[key].draws++;
            })
            return hash
        }, {});
        return Object.keys(res).map(s => ({ id: s, matches: res[s].matches, wins: res[s].wins, draws: res[s].draws, losses: res[s].losses, name: res[s].name, goals: res[s].goals, assists: res[s].assists, ownGoals: res[s].ownGoals, penalties: res[s].penalties, penaltiesFailed: res[s].penaltiesFailed })).sort((a, b) => (b.wins - a.wins) || (b.goals - a.goals) || (b.assists - a.assists));
    },
    highscoreMatch(state) {
        let data = !isEmpty(state.match) ? state.match.players : {}
        return Object.keys(data).map(s => ({ id: s, name: data[s].name, goals: data[s].goals, assists: data[s].assists })).sort((a, b) => (b.goals - a.goals) || (b.assists - a.assists));
    },
    matchesPlayed(state, getters, rootState) {
        return rootState.mode.playedMatchesOnly
            ? !isEmpty(state.matches) && !isEmpty(rootState.userPlayer)
                ? state.matches.filter((s) => s.players[rootState.userPlayer.id])
                : []
            : state.matches
    },
    hasMatches(state) {
        return isEmpty(state.matches) ? false : true
    }
}
