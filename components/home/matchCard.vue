<template>
  <b-col cols="12" md="12" lg="6" xl="6" class="mt-2 py-0 px-1" style="display: inline-block;">
    <b-row class="row-eq-height">
      <b-col cols="9" sm="9" md="10" lg="8" xl="10" class="pr-0 matchCard clicker">
        <b-card border-variant="primary" no-body style="height: 100%;">
          <div class="card-header bg-white">
            <b-col cols="12">
              <div class="row">
                <b-col cols="6" class="px-0">Carolina Michaelis</b-col>
                <b-col cols="6" class="text-right px-0">{{matchDate | moment("DD MMM YYYY HH:mm")}}</b-col>
              </div>
            </b-col>
          </div>
          <b-card-body class="p-2">
            <b-row>
              <b-col cols="12 player">
                <b-badge variant="info">Casa</b-badge>&nbsp;
                <label
                  v-for="player in playersHome"
                  :key="player.id"
                >&nbsp;{{ player.nickname }}&nbsp;</label>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12 player">
                <b-badge variant="danger">Fora</b-badge>&nbsp;
                <label
                  v-for="player in playersAway"
                  :key="player.id"
                >&nbsp;{{ player.nickname }}&nbsp;</label>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="3" sm="3" md="2" lg="4" xl="2" class="pl-1 matchCard clicker">
        <b-card
          v-if="result>0"
          border-variant="success"
          header="Vitória"
          header-bg-variant="success"
          header-text-variant="white"
          align="center"
        >
          <b-card-body class="resultado x my-auto">
            <label>{{goalsHome}}&nbsp;-&nbsp;{{goalsAway}}</label>
            <br />
            <label v-if="goalsHome>goalsAway">({{goalsHome-goalsAway}}&nbsp;-&nbsp;0)</label>
            <label v-else>(0&nbsp;-&nbsp;{{goalsAway-goalsHome}})</label>
          </b-card-body>
        </b-card>
        <b-card
          v-else-if="result<0"
          border-variant="danger"
          header="Derrota"
          header-bg-variant="danger"
          header-text-variant="white"
          align="center"
        >
          <b-card-body class="resultado x my-auto">
            <label>{{goalsHome}}&nbsp;-&nbsp;{{goalsAway}}</label>
            <br />
            <label v-if="goalsHome>goalsAway">({{goalsHome-goalsAway}}&nbsp;-&nbsp;0)</label>
            <label v-else>(0&nbsp;-&nbsp;{{goalsAway-goalsHome}})</label>
          </b-card-body>
        </b-card>
        <b-card
          v-else-if="result==0"
          border-variant="warning"
          header="Empate"
          header-bg-variant="warning"
          header-text-variant="white"
          align="center"
        >
          <b-card-body class="resultado x my-auto">
            <label>{{goalsHome}}&nbsp;-&nbsp;{{goalsAway}}</label>
            <br />
            <label>(0&nbsp;-&nbsp;0)</label>
          </b-card-body>
        </b-card>
        <b-card v-else border-variant="secondary" align="center">
          <b-card-body class="resultado my-auto">
            <label>{{goalsHome}}&nbsp;-&nbsp;{{goalsAway}}</label>
            <br />
            <label v-if="goalsHome>goalsAway">({{goalsHome-goalsAway}}&nbsp;-&nbsp;0)</label>
            <label v-else>(0&nbsp;-&nbsp;{{goalsAway-goalsHome}})</label>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import moment from 'moment'

export default {
	name: 'matchCard',
	props: { match: Object },
	methods: {},
	computed: {
		...mapGetters(['userPlayer']),
		matchDate() {
			return !_.isEmpty(this.match) ? this.match.beginTime.toDate() : ''
		},
		goalsHome() {
			return !_.isEmpty(this.match) ? this.match.counter.goals.home : 0
		},
		goalsAway() {
			return !_.isEmpty(this.match) ? this.match.counter.goals.away : 0
		},
		playersHome() {
			let data = !_.isEmpty(this.match) ? this.match.players : {}
			return Object.keys(data).reduce((filtered, s) => {
				if (data[s].local == 'home') {
					filtered.push({ id: s, nickname: data[s].nickname })
				}
				return filtered
			}, [])
		},
		playersAway() {
			let data = !_.isEmpty(this.match) ? this.match.players : {}
			return Object.keys(data).reduce((filtered, s) => {
				if (data[s].local == 'away') {
					filtered.push({ id: s, nickname: data[s].nickname })
				}
				return filtered
			}, [])
		},
		result() {
			return !_.isEmpty(this.match) &&
				!_.isEmpty(this.userPlayer) &&
				!_.isEmpty(this.match.players[this.userPlayer.id])
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
