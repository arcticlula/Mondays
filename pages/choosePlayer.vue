<template>
  <div class="content-page px-2">
    <b-card>
      <b-row class="pb-1">
        <b-col cols="12">
          <b-btn
            size="sm"
            class="w-100"
            variant="danger"
            @click="choosePlayer(null)"
          >Apenas Visitante</b-btn>
        </b-col>
      </b-row>
      <b-row>
        <profile
          v-on:click.native="choosePlayer(player)"
          v-for="player in players"
          :player="player"
          :key="player.id"
        ></profile>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import profile from '../components/choosePlayer/profile'
import lodash from 'lodash'
import Noty from 'noty'

export default {
	name: 'choosePlayer',
	layout: 'simple',
	computed: {
		...mapState('players', ['players'])
	},
	components: {
		profile
	},
	methods: {
		...mapActions(['checkUser', 'setPlayerUser']),
		async choosePlayer(player) {
			let text = !_.isEmpty(player)
				? `Tens a certeza que te queres associar ao jogador ${player.name}?`
				: 'Tens a certeza que não te queres associar a um jogador?'
			let n = new Noty({
				text: text,
				theme: 'metroui',
				type: 'error',
				layout: 'center',
				modal: true,
				buttons: [
					Noty.button(
						'Sim',
						'btn btn-outline-light btn-sm',
						async () => {
							await this.setPlayerUser(player)
							await this.checkUser()
							this.$router.push({ name: 'index' })
							n.close()
						}
					),
					Noty.button(
						'Não',
						'btn btn-outline-light btn-sm ml-1',
						() => {
							n.close()
						}
					)
				]
			}).show()
		}
	},
	async fetch({ store }) {
		try {
			await store.dispatch('players/getPlayers')
		} catch (e) {
			console.error(e)
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
