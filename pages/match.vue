<template>
  <div class="content-page py-0">
    <b-col cols="12" md="12" lg="5" xl="4" class="mt-2 py-0 px-1" style="display: inline-block;">
      <b-row class="row-eq-height">
        <b-col cols="12" class="reset-p py-0">
          <b-card border-variant="primary" no-body style="height: 100%;">
            <div class="card-header bg-white">
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
          <b-card border-variant="primary" style="height: 100%;" no-body class="gameInfo">
            <b-tabs card>
              <b-tab title="Resumo" active>
                <b-card-text>
                  <b-col cols="12">
                    <match-goals v-for="goal in goals" :goal="goal" :key="goal.id"></match-goals>
                  </b-col>
                  <b-col
                    v-if="canEdit"
                    cols="12"
                    class="mt-2 py-0 px-1"
                    style="display: inline-block;"
                  >
                    <b-btn
                      @click="showModal=true"
                      variant="outline-primary"
                      size="sm"
                      squared
                    >Editar Jogo</b-btn>
                    <b-btn
                      v-if="!hasGoals"
                      @click="deleteMatch"
                      variant="outline-primary"
                      size="sm"
                      squared
                    >Apagar Jogo</b-btn>
                    <nuxt-link :to="{ name: 'addGoal',query: routerQuery}">
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
    <b-modal
      v-model="showModal"
      title="Editar Jogo"
      header-bg-variant="dark"
      header-text-variant="light"
      body-bg-variant="light"
      body-text-variant="dark"
      footer-bg-variant="light"
    >
      <b-container fluid>
        <b-row class="mb-1">
          <b-col>
            <b-form-group class="mb-3" id="input-group-1" label="Data:" label-for="input-1">
              <b-form-datepicker required id="input-1" v-model="matchEdit.date"></b-form-datepicker>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row class="mb-1">
          <b-col>
            <b-form-group class="mb-3" id="input-group-2" label="Hora Início:" label-for="input-2">
              <b-form-timepicker id="input-2" v-model="matchEdit.beginTime"></b-form-timepicker>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group class="mb-3" id="input-group-3" label="Hora Fim:" label-for="input-3">
              <b-form-timepicker id="input-3" v-model="matchEdit.endTime"></b-form-timepicker>
            </b-form-group>
          </b-col>
        </b-row>
        <br />
        <br />
      </b-container>

      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            variant="outline-primary"
            size="sm"
            class="float-right"
            @click="editionMatch"
          >Gravar</b-button>
          <b-button
            variant="outline-primary"
            size="sm"
            class="float-right"
            @click="showModal=false"
          >Fechar</b-button>
        </div>
      </template>
    </b-modal>
    <b-modal
      v-model="modal.showGoal"
      title="Editar Golo"
      header-bg-variant="dark"
      header-text-variant="light"
      body-bg-variant="light"
      body-text-variant="dark"
      footer-bg-variant="light"
    >
      <b-container fluid>
        <b-row class="mb-2">
          <b-col>
            <b-form-group class="mb-3" id="input-group-0" label="Hora do golo:" label-for="input-0">
              <b-form-timepicker
                show-seconds
                @input="setTimeMin"
                id="input-0"
                v-model="goalEdit.time"
              ></b-form-timepicker>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              class="mb-3"
              id="input-group-1"
              label="Minuto do jogo:"
              label-for="input-1"
            >
              <b-form-input
                class="text-right"
                :readonly="true"
                id="input-1"
                :value="goalEdit.timeMin"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col>
            <b-form-group class="mb-3" id="input-group-2" label="Link Youtube:" label-for="input-2">
              <b-form-input
                id="input-2"
                @paste="pasteLink"
                v-model="goalEdit.URLLink"
                placeholder="Link Youtube"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col>
            <b-form-timepicker
              :disabled="urlTimeDisabled"
              seconds-step="5"
              show-seconds
              v-model="goalEdit.URLTime"
              @input="changeTimeLink"
            ></b-form-timepicker>
          </b-col>
          <b-col>
            <b-row>
              <b-btn class="mb-3 ml-2" size="sm" variant="outline-secondary" @click="pasteLink">
                <i class="dl dl-paste"></i>
              </b-btn>
              <b-btn class="mb-3 ml-2" size="sm" variant="outline-secondary" @click="deleteLink">
                <i class="dl dl-eliminar"></i>
              </b-btn>
            </b-row>
          </b-col>
        </b-row>
        <br />
        <br />
      </b-container>

      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            variant="outline-primary"
            size="sm"
            class="float-right"
            @click="editionGoal"
          >Gravar</b-button>
          <b-button
            variant="outline-primary"
            size="sm"
            class="float-right"
            @click="modal.showGoal=false"
          >Fechar</b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import matchGoals from '../components/match/matchGoals'
import court from '../components/match/court'
import highscore from '../components/match/highscore'
import { secondsToTime, timeToSeconds } from '../utils/time'
import { getQueryParams, updateURLParameter } from '../utils/url'
import moment from 'moment'
import lodash from 'lodash'
import Noty from 'noty'
export default {
	name: 'match',
	layout: 'simple',
	components: {
		matchGoals,
		court,
		highscore
	},
	data() {
		return {
			showModal: false,
			urlTimeDisabled: true
		}
	},
	computed: {
		...mapState(['mode', 'modal']),
		...mapState('matches', ['match', 'matchEdit']),
		...mapState('goals', ['goalEdit', 'goals']),
		...mapGetters(['canEdit']),
		...mapGetters('goals', ['hasGoals']),
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
	methods: {
		...mapActions('goals', ['editGoal', 'setTimeMin']),
		...mapActions('matches', ['editMatch', 'delMatch']),
		async pasteLink() {
			await this.$nextTick()
			this.goalEdit.URLLink = await navigator.clipboard.readText()
			let query = getQueryParams('t', this.goalEdit.URLLink)
			this.urlTimeDisabled = false
			if (query) {
				this.goalEdit.URLTime = secondsToTime(query)
			}
		},
		deleteLink() {
			this.goalEdit.URLLink = ''
			this.goalEdit.URLTime = '00:00:00'
		},
		changeTimeLink(value) {
			this.goalEdit.URLLink = updateURLParameter(
				this.goalEdit.URLLink,
				't',
				timeToSeconds(value)
			)
		},
		async editionMatch() {
			await this.editMatch()
			this.$noty.info('Jogo Actualizado!')
			this.showModal = false
		},
		async editionGoal() {
			await this.editGoal()
			this.$noty.info('Golo Actualizado!')
			this.urlTimeDisabled = true
			this.modal.showGoal = false
		},
		async deleteMatch() {
			let n = new Noty({
				text: 'Tens a certeza que queres apagar este jogo?',
				theme: 'metroui',
				type: 'error',
				layout: 'center',
				modal: true,
				buttons: [
					Noty.button(
						'Sim',
						'btn btn-outline-light btn-sm',
						async () => {
							await this.delMatch(this.match)
							this.$router.push({ name: 'index' })
							this.$noty.warning('Jogo Removido!')
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
