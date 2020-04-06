<template>
  <b-col cols="12" class="p-0">
    <b-row class="mb-1">
      <b-col cols="4" class="pr-0">
        <label>{{matchDate | moment("DD/MM/YYYY")}}</label>
      </b-col>
      <b-col cols="4" class="text-center p-0">
        <i class="dl dl-bola"></i>
        <label class="pr-1">{{playerGoals}}</label>
        <i class="dl dl-ass"></i>
        <label>{{playerAssists}}</label>
      </b-col>
      <b-col cols="4" class="text-right pl-0">
        <label class="pr-2">{{goalsHome}}-{{goalsAway}}</label>
        <label v-if="result>0" class="vitoria"></label>
        <label v-else-if="result<0" class="derrota"></label>
        <label v-else-if="result==0" class="empate"></label>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import lodash from 'lodash'

export default {
	name: 'matchStats',
	props: { match: Object },
	methods: {},
	computed: {
		...mapGetters(['userPlayer']),
		matchDate() {
			return !_.isEmpty(this.match)
				? moment(
						this.match.beginTime
							.toDate()
							.toLocaleDateString('pt-PT', { timeZone: 'UTC' }),
						'DD/MM/YYYY'
				  )
				: moment()
		},
		goalsHome() {
			return !_.isEmpty(this.match) ? this.match.counter.goals.home : 0
		},
		goalsAway() {
			return !_.isEmpty(this.match) ? this.match.counter.goals.away : 0
		},
		playerGoals() {
			return !_.isEmpty(this.match) && !_.isEmpty(this.userPlayer)
				? this.match.players[this.userPlayer.id].goals
				: 0
		},
		playerAssists() {
			return !_.isEmpty(this.match) && !_.isEmpty(this.userPlayer)
				? this.match.players[this.userPlayer.id].assists
				: 0
		},
		result() {
			return !_.isEmpty(this.match) && !_.isEmpty(this.userPlayer)
				? this.match.players[this.userPlayer.id].local == 'home'
					? this.match.counter.goals.home -
					  this.match.counter.goals.away
					: this.match.counter.goals.away -
					  this.match.counter.goals.home
				: null
		}
	}
}
</script>

<style scoped>
</style>
