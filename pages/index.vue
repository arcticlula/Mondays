<template>
  <div class="container">
    <div>
      <p>{{ matches}}</p>
      <p>{{ teams }}</p>
      <p>{{ players }}</p>
      <p>{{ goals }}</p>
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
			await store.dispatch('matches/getMatches')
			await store.dispatch('teams/getTeams')
			await store.dispatch('players/getPlayers')
			await store.dispatch('goals/getGoals')
		} catch (e) {
			console.error(e)
		}
	},
	computed: {
		...mapState('players', ['players']),
		...mapState('teams', ['teams']),
		...mapState('matches', ['matches']),
		...mapState('goals', ['goals'])
	},
	async mounted() {
		try {
			await this.getMatches()
			await this.getTeams()
			await this.getPlayers()
			await this.getGoals()
		} catch (e) {
			console.error(e)
		}
	},
	methods: {
		...mapActions('players', ['getPlayers']),
		...mapActions('teams', ['getTeams']),
		...mapActions('matches', ['getMatches']),
		...mapActions('goals', ['getGoals'])
	}
}
</script>
