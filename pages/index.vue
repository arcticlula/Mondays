<template>
  <div class="container">
    <div>
      <h1 class="title">nuxt-fire-vuexfire-example</h1>
      <h2 class="subtitle">Example project showcasing the use of nuxt-fire together with vuexfire.</h2>
      <h3>Count</h3>
      <p class="count">{{ count }}</p>
      <p>{{ Matches}}</p>
      <p>{{ Teams }}</p>
      <p>{{ Players }}</p>
      <p>{{ Goals }}</p>
      <div class="links">
        <div class="button--green" @click="changeCount(-1)">-1</div>
        <div class="button--green" @click="changeCount(1)">+1</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      jogo: {}
    }
  },
  async fetch({ store }) {
    try {
      // ONLY NEEDED IF IN SSR (UNIVERSAL) MODE, not needed in SPA MODE
      // Binds it on server side, but will not rebind on client-side
      await store.dispatch('bindCountDocument')
      await store.dispatch('bindMatches')
      await store.dispatch('bindTeams')
      await store.dispatch('bindPlayers')
      await store.dispatch('bindGoals')
    } catch (e) {
      console.error(e)
    }
  },
  computed: {
    ...mapState(['Matches', 'Teams', 'Players', 'Goals']),
    ...mapGetters(['count'])
  },
  async mounted() {
    try {
      // Binds it on client-side
      await this.bindCountDocument()
      await this.bindMatches()
      await this.bindTeams()
      await this.bindPlayers()
      await this.bindGoals()
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    ...mapMutations(['changeCount']),
    ...mapActions([
      'bindCountDocument',
      'bindMatches',
      'bindTeams',
      'bindPlayers',
      'bindGoals'
    ])
  }
}
</script>
