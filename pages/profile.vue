<template>
  <div class="content-page py-0">
    <b-col
      cols="12"
      md="12"
      lg="7"
      xl="6"
      class="mt-2 playerProfile py-0 px-1"
      style="display: inline-block;"
    >
      <b-row class="row-eq-height">
        <b-col cols="12" class="py-0">
          <b-card border-variant="primary" no-body style="height: 100%;">
            <div class="card-header bg-white">
              <!-- <b-col cols="12">
              <div class="row">
                <b-col cols="12" class="px-0">{{playerUser.name}}</b-col>
              </div>
              </b-col>-->
            </div>
            <b-card-body class="px-2 py-1">
              <!-- {{playerUser}} -->
              <b-col cols="12">
                <b-row>
                  <b-col cols="3" sm="2" class="px-0">
                    <span class="playerProfile text-center">
                      <img :src="activeUser.photoURL" />
                    </span>
                  </b-col>
                  <b-col cols="9" sm="10">
                    <b-row>
                      <b-col cols="12">
                        <b>Nome:</b>
                        {{playerUser.name}}
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
                  </b-col>
                </b-row>
              </b-col>
            </b-card-body>
          </b-card>
        </b-col>
        <!-- <b-col cols="3" sm="3" md="2" lg="4" xl="2" class="pl-1">
				<b-card
					border-variant="primary"
					header="Posição"
					header-bg-variant="primary"
					header-text-variant="white"
					align="center"
				>
					<b-card-body class="classificacao my-auto">
						<label>#8</label>
					</b-card-body>
				</b-card>
        </b-col>-->
      </b-row>
      <b-row>
        <b-col cols="12" class="mt-2">
          <b-card border-variant="primary" no-body style="height: 100%;">
            <div class="card-header bg-white">
              <b-col cols="12" class="p-0">
                <b-row>
                  <b-col cols="4">
                    <label>Jogo</label>
                  </b-col>
                  <b-col cols="4" class="text-center">
                    <label
                      class="d-none d-sm-inline d-md-inline d-lg-inline d-xl-inline"
                    >Golos &amp; Assistências</label>
                    <label class="d-inline d-sm-none d-md-none d-lg-none d-xl-none">
                      <i class="dl dl-bola"></i> &amp;
                      <i class="dl dl-ass"></i>
                    </label>
                  </b-col>
                  <b-col cols="4" class="text-right">
                    <label>Resultado</label>
                  </b-col>
                </b-row>
              </b-col>
            </div>
            <b-card-body class="p-2">
              <b-col v-for="match in matches" :key="match.id" cols="12" class="p-0">
                <b-row class="mb-1">
                  <b-col cols="4" class="pr-0">
                    <label>{{match.beginTime.toDate() | moment("DD/MM/YYYY")}}</label>
                  </b-col>
                  <!-- <b-col cols="4" class="text-center p-0">
                    <i class="dl dl-bola"></i>
                    <label class="pr-1">{{jogo.golos}}</label>
                    <i class="dl dl-ass"></i>
                    <label>{{jogo.assistencias}}</label>
                  </b-col>-->
                  <b-col cols="4" class="text-right pl-0">
                    <label class="pr-2">{{goalsHome(match)}}-{{goalsAway(match)}}</label>
                    <label v-if="goalsHome(match)>goalsAway(match)" class="vitoria"></label>
                    <label v-else-if="goalsHome(match)<goalsAway(match)" class="derrota"></label>
                    <label v-else class="empate"></label>
                  </b-col>
                </b-row>
              </b-col>
            </b-card-body>
          </b-card>
        </b-col>
        <!-- <b-col cols="12" class="mt-2">
				<b-card border-variant="primary" no-body style="height: 100%;">
					<div class="card-header bg-white">
						<heatmap />
					</div>
				</b-card>
        </b-col>-->
      </b-row>
    </b-col>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import moment from 'moment'
// import chartHeatmap from "./chartHeatmap.vue";

export default {
  name: 'profile',
  layout: 'simple',
  // components: {
  // 	heatmap: chartHeatmap
  // },
  data() {
    return {
      jogadorInfo: []
    }
  },
  computed: {
    ...mapState('players', ['playerUser']),
    ...mapState('matches', ['matches']),
    ...mapState('goals', ['goals']),
    ...mapGetters(['activeUser']),
    ...mapGetters('players', ['userDob']),
    age() {
      return moment().diff(this.userDob, 'years', false) + ' anos'
    }
  },
  async fetch({ store }) {
    try {
      await store.dispatch('players/getPlayerUser')
      await store.dispatch('matches/getMatches')
      await store.dispatch('goals/getGoalsByPlayer', 'gj0FqLu415vpu59nBSZA')
      console.log(store.state)
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    getDateMatch(date) {
      return date ? date.toDate() : ''
    },
    goalsHome(match) {
      return match.teamA ? Object.keys(match.teamA.goals).length : 0
    },
    goalsAway(match) {
      return match.teamB ? Object.keys(match.teamB.goals).length : 0
    }
  }
}
</script>

<style scoped>
</style>
