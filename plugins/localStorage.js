import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
    window.onNuxtReady(() => {
        createPersistedState({
            key: 'mondays',
            paths: ['userDB', 'userPlayer', 'navbar', 'mode.night', 'mode.playedMatchesOnly', 'highscore'],
            rehydrated: ({ state }) => {
                let element = document.getElementsByTagName("body")[0];
                state.mode.night ? element.classList.add("moon") : element.classList.remove("moon")
            }
        })(store)
    }
    )
}