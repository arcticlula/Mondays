<template>
  <div class="content-page py-0">
    <b-col cols="12" md="12" lg="5" xl="4" class="mt-2 py-0 px-1" style="display: inline-block;">
      <b-row class="row-eq-height">
        <b-col cols="12" class="reset-p py-0">
          <b-card border-variant="primary" no-body style="height: 100%;">
            <div class="card-header bg-white">
              <b-col cols="12">
                <div class="row">
                  <b-col cols="12" class="px-0">{{matchDate| moment("DD MMM YYYY HH:mm")}}</b-col>
                </div>
              </b-col>
            </div>
            <b-card-body class="px-2 pt-2 pb-0">
              <b-col cols="12">
                <b-row>
                  <b-col cols="5">
                    <b-row>
                      <b-col cols="12" class="text-center">
                        <h3>
                          <b-badge variant="info">Casa</b-badge>
                        </h3>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col cols="2"></b-col>
                  <b-col cols="5">
                    <b-row>
                      <b-col cols="12" class="text-center">
                        <h3>
                          <b-badge variant="danger">Fora</b-badge>
                        </h3>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="5">
                    <b-row>
                      <b-col cols="12" class="text-center">
                        <h3>{{goalsHome}}</h3>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col cols="2" class="text-center">
                    <h3>-</h3>
                  </b-col>
                  <b-col cols="5">
                    <b-row>
                      <b-col cols="12" class="text-center">
                        <h3>{{goalsAway}}</h3>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-col>
              <b-table striped hover></b-table>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" class="mt-2 reset-p">
          <b-card border-variant="primary" style="height: 100%;" no-body class="gameInfo">
            <b-tabs card>
              <b-tab title="Resumo" active>
                <b-card-text>
                  <b-col cols="12">
                    <div v-for="goal in goals" :key="goal.id">
                      <div v-if="!goal.isOwnGoal">
                        <b-row v-if="goal.local=='home'" class="my-1">
                          <b-col cols="12">
                            <label class="pr-1">{{goal.timeMin}}</label>
                            <i class="dl dl-bola"></i>
                            <label class="pr-1">
                              <b>{{goal.goal.name}}</b>
                            </label>
                            <label v-if="!!goal.assist">({{goal.assist.name}})</label>
                            <label v-else-if="goal.isPenalty">(Penalidade)</label>
                          </b-col>
                        </b-row>
                        <b-row v-else class="my-1">
                          <b-col cols="12" class="text-right">
                            <label v-if="!!goal.assist" class="pr-1">({{goal.assist.name}})</label>
                            <label v-else-if="goal.isPenalty">(Penalidade)</label>
                            <label class="pr-1">
                              <b>{{goal.goal.name}}</b>
                            </label>
                            <i class="dl dl-bola"></i>
                            <label class="pl-1">{{goal.timeMin}}</label>
                          </b-col>
                        </b-row>
                      </div>
                      <div v-else>
                        <b-row v-if="goal.local=='away'" class="my-1">
                          <b-col cols="12">
                            <label class="pr-1">{{goal.timeMin}}</label>
                            <i class="dl dl-bola text-red"></i>
                            <label class="pr-1">
                              <b>{{goal.goal.name}}</b>
                            </label>
                            <label>(Auto-Golo)</label>
                          </b-col>
                        </b-row>
                        <b-row v-else class="my-1">
                          <b-col cols="12" class="text-right">
                            <label class="pr-1">(Auto-Golo)</label>
                            <label class="pr-1">
                              <b>{{goal.goal.name}}</b>
                            </label>
                            <i class="dl dl-bola text-red"></i>
                            <label class="pl-1">{{goal.timeMin}}</label>
                          </b-col>
                        </b-row>
                      </div>
                    </div>
                  </b-col>
                </b-card-text>
              </b-tab>
              <b-tab class="formacoes px-0" title="Formações">
                <b-card-text>
                  <b-col cols="12" class="p-0 bg-dark">
                    <court :playersHome="playersHome" :playersAway="playersAway"></court>
                  </b-col>
                  <b-col cols="12" class="px-0">
                    <b-row class="my-1">
                      <b-col cols="6">
                        <b-row>
                          <b-col
                            cols="12"
                            v-for="player in playersHome"
                            v-bind:player="player"
                            v-bind:key="player.name"
                          >
                            <i class="dl dl-player home ml-2"></i>
                            <label class="pl-1">{{player.name}}</label>
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col cols="6">
                        <b-row>
                          <b-col
                            cols="12"
                            class="text-right"
                            v-for="player in playersAway"
                            v-bind:player="player"
                            v-bind:key="player.name"
                          >
                            <label class="pr-1">{{player.name}}</label>
                            <i class="dl dl-player away mr-2"></i>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-card-text>
              </b-tab>
              <b-tab title="Estatísticas">
                <b-card-text>
                  <b-col cols="12" class="px-0">
                    <b-row class="my-1">
                      <b-col cols="12">Estatísticas</b-col>
                      <highscore :match="match" />
                      <!-- <label>Maior envolvimento no jogo:</label> -->
                    </b-row>
                  </b-col>
                </b-card-text>
              </b-tab>
            </b-tabs>
          </b-card>
        </b-col>
      </b-row>
    </b-col>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import court from '../components/match/court'
import highscore from '../components/match/highscore'
export default {
	name: 'match',
	layout: 'simple',
	components: {
		court,
		highscore
	},
	computed: {
		...mapState('matches', ['match']),
		...mapState('goals', ['goals']),
		...mapGetters('matches', [
			'goalsHome',
			'goalsAway',
			'playersHome',
			'playersAway',
			'matchDate'
		]),
		routerPath() {
			return this.$nuxt.$route.name
		},
		routerQuery() {
			return this.$nuxt.$route.query
		}
	},
	methods: {},
	async fetch({ store, route }) {
		try {
			await store.dispatch('matches/getMatchById', route.query.match)
			await store.dispatch('goals/getGoalsFromMatch', route.query.match)
		} catch (e) {
			console.error(e)
		}
	}
}
</script>

<style scoped>
</style>
