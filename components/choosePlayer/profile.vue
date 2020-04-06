<template>
  <b-card border-variant="primary" cols="4" class="p-3 clicker" style="display: inline-block;">
    <!-- {{playerUser}} -->
    <b-row>
      <b-col cols="2" class="px-1">
        <span class="playerProfile text-center">
          <img :src="require(`../../assets/players/joao.jpg`)" />
        </span>
      </b-col>
      <b-col cols="10" class="pl-5">
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
            <span class="d-inline d-sm-inline d-md-none d-lg-none d-xl-none font-weight-bold">Nasc.:</span>
            {{userDob | moment("DD/MM/YYYY")}}
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-card>
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
