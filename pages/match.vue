<template>
  <div class="content-page py-0">
    <b-col cols="12" md="12" lg="5" xl="4" class="mt-2 py-0 px-1" style="display: inline-block;">
      <b-row class="row-eq-height">
        <b-col cols="12" class="reset-p py-0">
          <b-card border-variant="primary" no-body style="height: 100%;">
            <div class="card-header">
              <b-col cols="12">
                <div class="row">
                  <b-col cols="12" class="px-0">{{matchDate| moment("DD MMMM YYYY HH:mm")}}</b-col>
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
          <b-card style="height: 100%;" no-body class="gameInfo">
            <b-tabs card>
              <b-tab title="Resumo" active>
                <b-card-text>
                  <b-col cols="12">
                    <match-goals v-for="goal in goals" :goal="goal" :key="goal.id"></match-goals>
                  </b-col>
                  <b-col cols="12" class="mt-2 py-0 px-2" style="display: inline-block;">
                    <b-btn
                      v-if="canEditMatch"
                      @click="modal.showMatch=true"
                      variant="outline-primary"
                      size="sm"
                      squared
                    >Editar Jogo</b-btn>
                    <nuxt-link v-if="canAddGoals" :to="{ name: 'addGoal',query: routerQuery}">
                      <b-btn variant="outline-primary" size="sm" squared>Adicionar Golos</b-btn>
                    </nuxt-link>
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
    <modal-edit-match />
    <modal-edit-goal />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import matchGoals from '../components/match/matchGoals'
import court from '../components/match/court'
import highscore from '../components/match/highscore'
import modalEditMatch from '../components/modalEditMatch'
import modalEditGoal from '../components/modalEditGoal'

import moment from 'moment'
import { isEmpty } from 'lodash'
import Noty from 'noty'
export default {
  name: 'match',
  layout: 'simple',
  components: {
    matchGoals,
    court,
    highscore,
    modalEditMatch,
    modalEditGoal
  },
  computed: {
    ...mapState(['modal']),
    ...mapState('matches', ['match']),
    ...mapState('goals', ['goals']),
    ...mapGetters(['canEditMatch', 'canAddGoals']),
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
  async fetch({ store, route }) {
    try {
      await store.dispatch('matches/getMatchById', route.query.match)
      store.dispatch('goals/getGoalsFromMatch', route.query.match) //takes too long, better to let it load freely
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<style scoped>
</style>
