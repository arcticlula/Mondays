<template>
  <div class="p-2">
    <b-card>
      <profile
        v-on:click.native="choosePlayer(player.id)"
        v-for="player in players"
        :player="player"
        :key="player.id"
      ></profile>
      <b-card>
        <b-btn
          size="sm"
          squared
          variant="outline-primary"
          @click="choosePlayer(null)"
        >Apenas Visitante</b-btn>
      </b-card>
    </b-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import profile from '../components/choosePlayer/profile'

export default {
	name: 'choosePlayer',
	computed: {
		...mapState('players', ['players'])
	},
	components: {
		profile
	},
	methods: {
		...mapActions(['checkUser', 'setPlayerUser']),
		async choosePlayer(id) {
			await this.setPlayerUser(id)
			await this.checkUser()
			this.$router.push({ name: 'index' })
		}
	},
	async fetch({ store }) {
		try {
			await store.dispatch('players/getPlayers')
		} catch (e) {
			console.error(e)
		}
		console.log(store.state.players)
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
