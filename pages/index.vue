<template>
  <div>
    <div class="content-page py-0">
      <match-card
        v-on:click.native="openMatch(match.id)"
        v-for="match in matchesPlayed"
        :match="match"
        :key="match.id"
      ></match-card>
      <b-col v-if="mode.edition" cols="12" class="mt-2 py-0 px-1" style="display: inline-block;">
        <nuxt-link :to="{ name: 'addTeamMatch'}">
          <b-button variant="outline-primary" size="sm" squared>Adicionar Jogo</b-button>
        </nuxt-link>
      </b-col>
      <highscore />
    </div>
  </div>
</template>

<script>
import matchCard from '../components/home/matchCard'
import highscore from '../components/home/highscore'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'home',
  layout: 'home',
  computed: {
    ...mapState(['mode', 'navbar', 'userPlayer']),
    ...mapGetters(['yearLow', 'yearHigh']),
    ...mapGetters('matches', ['matchesPlayed'])
  },
  components: {
    matchCard,
    highscore
  },
  methods: {
    openMatch(id) {
      console.log(id)
      this.$router.push({ name: 'match', query: { match: id } })
    }
  }
  // async fetch({ store }) {
  // 	try {
  // 		await store.dispatch('matches/getMatchesByDate')
  // 	} catch (e) {
  // 		console.error(e)
  // 	}
  // }
}
</script>

<style scoped>
</style>
