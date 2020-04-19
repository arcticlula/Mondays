<template>
  <div>
    <div class="content-page py-0">
      <match-card
        v-on:click.native="openMatch(match.id)"
        v-for="match in matchesPlayed"
        :match="match"
        :key="match.id"
      ></match-card>
      <b-row>
        <b-col class="mt-2 ml-3 py-0 px-1">
          <nuxt-link :to="{ name: 'addTeamMatch'}">
            <b-btn v-if="canAddMatch" variant="outline-primary" size="sm" squared>Adicionar Jogo</b-btn>
          </nuxt-link>
          <nuxt-link :to="{ name: 'addPlayer'}">
            <b-btn v-if="canAddPlayer" variant="outline-primary" size="sm" squared>Adicionar Jogador</b-btn>
          </nuxt-link>
        </b-col>
      </b-row>
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
  data() {
    return {}
  },
  computed: {
    ...mapState(['mode', 'navbar', 'userPlayer']),
    ...mapGetters(['yearLow', 'yearHigh', 'canAddPlayer', 'canAddMatch']),
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
