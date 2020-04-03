import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
    window.onNuxtReady(() => {
        createPersistedState({
            key: 'mondays',
            paths: ['userDB', 'navbar', 'nightMode'],
            rehydrated: ({ state }) => {
                let element = document.getElementsByTagName("body")[0];
                state.nightMode ? element.classList.add("moon") : element.classList.remove("moon")
            }
        })(store)
    }
    )
}