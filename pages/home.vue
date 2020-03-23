<template>
  <div>
    <div class="content-page py-0">
      <match-card
        v-on:click.native="openMatch(match.id)"
        v-for="match in matches"
        v-bind:match="match"
        v-bind:key="match.id"
      ></match-card>
      <!-- <highscore /> -->
    </div>
  </div>
</template>

<script>
import matchCard from '../components/home/matchCard'
import highscore from '../components/home/highscore'
import { mapState, mapGetters, mapActions } from 'vuex'
import requiredLogin from '../mixins/requiredLogin'

export default {
  name: 'home',
  layout: 'home',
  computed: {
    ...mapState(['navbar', 'matches']),
    ...mapState('login', ['user']),
    ...mapGetters(['yearLow', 'yearHigh'])
  },
  components: {
    matchCard,
    highscore
  },
  methods: {
    ...mapActions('matches', ['getMatchesByDate']),
    openMatch(id) {
      console.log(id)
      this.$router.push({ name: 'match', query: { id: id } })
    }
  },
  async fetch({ store }) {
    try {
      await store.dispatch('getMatchesByDate')
    } catch (e) {
      console.error(e)
    }
  },
  async mounted() {
    try {
      await this.getMatchesByDate()
    } catch (e) {
      console.error(e)
    }
    console.log(this.matches)
  }
  // mixins: [requiredLogin]
}
</script>

<style scoped>
</style>
