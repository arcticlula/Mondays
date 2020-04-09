<template>
  <b-col cols="12" md="6" lg="4" class="px-3 pb-1">
    <b-card
      bg-variant="info"
      text-variant="white"
      class="px-3 clicker w-100"
      style="display: inline-block;"
    >
      <b-row>
        <div class="mr-2" style="display: grid;">
          <span class="playerProfile text-center">
            <img class="badge-xl" :src="require(`../../assets/players/joao.jpg`)" />
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
              <b>Idade:</b>
              {{age}}
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <span
                class="d-none d-sm-none d-md-inline d-lg-inline d-xl-inline font-weight-bold"
              >Data Nascimento:</span>
              <span
                class="d-inline d-sm-inline d-md-none d-lg-none d-xl-none font-weight-bold"
              >Nasc.:</span>
              {{userDob | moment("DD/MM/YYYY")}}
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
	methods: {},
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
