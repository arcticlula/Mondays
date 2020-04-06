import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
    window.onNuxtReady(() => {
        createPersistedState({
            key: 'mondays',
            paths: ['userDB', 'userPlayer', 'navbar', 'nightMode'],
            overwrite: true,
            rehydrated: ({ state }) => {
                let element = document.getElementsByTagName("body")[0];
                state.nightMode ? element.classList.add("moon") : element.classList.remove("moon")
                // state.userDB = Object.assign({}, state.userDB)
                // state.userPlayer = Object.assign({}, state.userPlayer)
            }
        })(store)
    }
    )
}