<template>
  <b-col cols="12" md="6" lg="4" class="px-3 pb-1">
    <b-card
      border-variant="primary"
      text-variant="dark"
      class="px-3 clicker w-100"
      style="display: inline-block;"
    >
      <b-row>
        <div class="mr-2" style="display: grid;">
          <span class="playerProfile text-center">
            <img class="badge-xl" :src="getImg(player.id)" />
          </span>
        </div>
        <div style="display: grid;">
          <b-row>
            <b-col cols="12">
              <b>Nome:</b>
              {{player.name}}
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b>Alcunha:</b>
              {{player.nickname}}
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b>Idade:</b>
              {{age}} ({{userDob | moment("DD/MM/YYYY")}})
            </b-col>
          </b-row>
        </div>
      </b-row>
    </b-card>
  </b-col>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import lodash from 'lodash'

export default {
	name: 'profile',
	props: { player: Object },
	methods: {
		getImg(id) {
			try {
				return require(`@/assets/${process.env.PLAYERS_ASSETS}/${id}.jpg`)
			} catch (e) {
				return require(`@/assets/players-dev/playernull.jpg`)
			}
		}
	},
	computed: {
		userDob() {
			return !_.isEmpty(this.player)
				? moment(
						this.player.dob
							.toDate()
							.toLocaleDateString('pt-PT', { timeZone: 'UTC' }),
						'DD/MM/YYYY',
						'DD/MM/YYYY'
				  )
				: moment()
		},
		age() {
			return moment().diff(this.userDob, 'years', false) + ' anos'
		}
	}
}
</script>

<style scoped>
</style>
