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
                  v-bind:key="player.id"
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
          v-if="goalsHome>goalsAway"
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
          v-else-if="goalsHome<goalsAway"
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
          v-else-if="goalsHome==goalsAway"
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
        <b-card
          v-else
          border-variant="secondary"
          header
          header-bg-variant="secondary"
          header-text-variant="white"
          align="center"
        >
          <b-card-body class="resultado my-auto">
            <label>{{goalsHome}}&nbsp;-&nbsp;{{goalsAway}}</label>
            <br />
            <label>(0&nbsp;-&nbsp;0)</label>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'matchCard',
  props: { match: Object },
  methods: {},
  computed: {
    matchDate() {
      return this.match.beginTime.seconds
    },
    playersHome() {
      return this.match.teamA ? this.match.teamA.players : []
    },
    playersAway() {
      return this.match.teamB ? this.match.teamB.players : []
    },
    goalsHome() {
      return this.match.teamA ? Object.keys(this.match.teamA.goals).length : 0
    },
    goalsAway() {
      return this.match.teamB ? Object.keys(this.match.teamB.goals).length : 0
    }
  }
}
</script>

<style scoped>
</style>
