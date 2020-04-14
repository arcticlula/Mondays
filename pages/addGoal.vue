<template>
  <div class="content-page">
    <b-row>
      <b-col cols="12" md="6" lg="6">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-card>
            <b-row>
              <!-- <b-col cols="6"> -->
              <!-- <b-form-group class="mb-3" id="input-group-1" label="Data:" label-for="input-1">
              <b-form-datepicker required id="input-1" v-model="form.date"></b-form-datepicker>
            </b-form-group>
            <b-form-group class="mb-3" id="input-group-2" label="Hora Início:" label-for="input-2">
              <b-form-timepicker id="input-2" v-model="form.beginTime"></b-form-timepicker>
            </b-form-group>
            <b-form-group class="mb-3" id="input-group-3" label="Hora Fim:" label-for="input-3">
              <b-form-timepicker id="input-3" v-model="form.endTime"></b-form-timepicker>
              </b-form-group>-->
              <!-- <b-form-group class="mb-3" id="input-group-4" label="Golos:" label-for="input-4">
              <b-form-select
                @change="addTeamToMatch('A')"
                :options="teamsUnselected"
                value-field="id"
                text-field="id"
                id="input-4"
                v-model="form.teamA"
              ></b-form-select>
            </b-form-group>
            <b-form-group class="mb-3" id="input-group-5" label="Equipa Fora" label-for="input-5">
              <b-form-select
                @change="addTeamToMatch('B')"
                :options="teamsUnselected"
                value-field="id"
                text-field="id"
                id="input-5"
                v-model="form.teamB"
              ></b-form-select>
              </b-form-group>-->
              <!-- </b-col> -->
              <b-col cols="12">
                <!-- <b-table
              :items="goals"
              :fields="[{key:'time',label:'Tempo'},{key:'goal.name',label:'Marcador'},{key:'assist.name',label:'Assistência'},{key:'type',label:'Tipo'}]"
                ></b-table>-->
                <b-card-text>
                  <b-col cols="12">
                    <match-goals v-for="goal in goals" :goal="goal" :key="goal.id"></match-goals>
                  </b-col>
                </b-card-text>
              </b-col>
            </b-row>
          </b-card>
          <b-card class="mt-1">
            <b-row>
              <b-col cols="12" md="11">
                <b-row>
                  <b-col cols="12">
                    <b-row>
                      <b-col cols="4" md="4" lg="2">
                        <b-form-group
                          class="mb-3 mx-3"
                          id="input-group-0"
                          label="Equipa:"
                          label-for="input-0"
                        >
                          <b-form-checkbox
                            @change="setTeamId"
                            id="input-0"
                            v-model="form.local"
                            value="B"
                            unchecked-value="A"
                            switch
                          >
                            <b>{{form.local}}</b>
                          </b-form-checkbox>
                        </b-form-group>
                      </b-col>
                      <b-col cols="5" md="5" lg="4">
                        <b-form-group
                          class="mb-3 ml-3"
                          id="input-group-1"
                          label="Tempo:"
                          label-for="input-1"
                        >
                          <b-form-timepicker show-seconds required id="input-1" v-model="form.time"></b-form-timepicker>
                        </b-form-group>
                      </b-col>
                      <b-col cols="3" md="3" lg="2">
                        <b-form-group
                          class="mb-3"
                          id="label-group-1"
                          label="Minuto:"
                          label-for="label-1"
                        >
                          <b-form-input :readonly="true" id="label-1" :value="getMinute"></b-form-input>
                        </b-form-group>
                      </b-col>
                      <b-col cols="6" md="6" lg="4">
                        <b-form-group
                          class="mb-3 ml-3"
                          id="input-group-2"
                          label="Marcador:"
                          label-for="input-2"
                        >
                          <b-form-select
                            required
                            :options="playersScore"
                            value-field="id"
                            text-field="nickname"
                            id="input-2"
                            v-model="form.goal"
                          ></b-form-select>
                        </b-form-group>
                      </b-col>
                      <b-col cols="6" md="6" lg="4">
                        <b-form-group
                          class="mb-3 ml-3"
                          id="input-group-3"
                          label="Assistência:"
                          label-for="input-3"
                        >
                          <b-form-select
                            :disabled="form.type=='O' || form.type=='PF'"
                            :options="playersAssist"
                            value-field="id"
                            text-field="nickname"
                            id="input-3"
                            v-model="form.assist"
                          ></b-form-select>
                        </b-form-group>
                      </b-col>
                      <b-col cols="12" md="12" lg="8">
                        <b-form-group
                          class="mb-3 ml-3"
                          id="input-group-4"
                          label="Tipo:"
                          label-for="input-4"
                        >
                          <b-row>
                            <b-form-checkbox
                              class="mx-3"
                              value="O"
                              unchecked-value="N"
                              v-model="form.type"
                              @change="checkToggle"
                            >Auto-Golo</b-form-checkbox>
                            <b-form-checkbox
                              class="mx-3"
                              value="P"
                              unchecked-value="N"
                              v-model="form.type"
                            >Penalidade</b-form-checkbox>
                            <b-form-checkbox
                              value="PF"
                              unchecked-value="N"
                              v-model="form.type"
                              @change="checkToggle"
                            >Pen. Falhado</b-form-checkbox>
                          </b-row>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col cols="12">
                    <b-row>
                      <b-col cols="11" md="11" lg="6">
                        <b-form-input
                          class="mb-3 ml-3"
                          @paste="pasteLink"
                          v-model="form.url.link"
                          placeholder="Link Youtube"
                        ></b-form-input>
                      </b-col>
                      <b-col cols="7" md="7" lg="4">
                        <b-form-timepicker
                          class="mb-3 ml-3"
                          :disabled="urlTimeDisabled"
                          seconds-step="5"
                          show-seconds
                          v-model="form.url.time"
                          @input="changeTimeLink"
                        ></b-form-timepicker>
                      </b-col>
                      <b-col cols="5" md="5" lg="2">
                        <b-row>
                          <b-btn
                            class="mb-3 ml-2"
                            size="sm"
                            variant="outline-secondary"
                            @click="pasteLink"
                          >
                            <i class="dl dl-paste"></i>
                          </b-btn>
                          <b-btn
                            class="mb-3 ml-2"
                            size="sm"
                            variant="outline-secondary"
                            @click="deleteLink"
                          >
                            <i class="dl dl-eliminar"></i>
                          </b-btn>
                        </b-row>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" class="pr-4" style="align-self: center; text-align: right;">
                <b-form-group
                  class="ml-3"
                  style="align-self: center;"
                  id="input-group-5"
                  label-text-align="right"
                  label-for="input-5"
                >
                  <b-btn type="submit" size="sm" variant="outline-primary">
                    <span class="dl dl-plus"></span>
                  </b-btn>
                </b-form-group>
              </b-col>
            </b-row>
          </b-card>
        </b-form>
      </b-col>
      <!-- <b-col cols="12" md="3">
        <b-row>
          <b-col cols="12">
            <b-card class="mt-1" header="Jogo">
              <pre>{{ form }}</pre>
            </b-card>
          </b-col>
        </b-row>
      </b-col>-->
    </b-row>
    <!-- <b-row class="px-2 mt-3">
    <b-col cols="12">-->
    <!-- <b-card class="mr-2" :header="match.id">
          <pre class="m-0">{{ match }}</pre>
    </b-card>-->
    <!-- <b-card v-for="goal in goals" :key="goal.id" :header="goal.id">
          <pre>{{ goal }}</pre>
    </b-card>-->
    <!-- </b-col>
    </b-row>-->
    <modal-edit-goal />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import matchGoals from '../components/addGoal/matchGoals'
import modalEditGoal from '../components/modalEditGoal'
import isTimestamp from '../utils/isTimestamp'
import { secondsToTime, timeToSeconds } from '../utils/time'
import { getQueryParams, updateURLParameter } from '../utils/url'
import lodash from 'lodash'
import moment from 'moment'

export default {
	name: 'addGoal',
	layout: 'simple',
	components: {
		matchGoals,
		modalEditGoal
	},
	computed: {
		...mapState('matches', ['match', 'matches']),
		...mapState('goals', ['goals']),
		routerQuery() {
			return this.$nuxt.$route.query
		},
		playersScore() {
			let data = !_.isEmpty(this.match) ? this.match.players : {}
			let local = this.form.local == 'A' ? 'home' : 'away'
			return Object.keys(data).reduce((filtered, s) => {
				if (data[s].local == local) {
					filtered.push({
						id: s,
						name: data[s].name,
						nickname: data[s].nickname
					})
				}
				return filtered
			}, [])
		},
		playersAssist() {
			let data = !_.isEmpty(this.match) ? this.match.players : {}
			let local = this.form.local == 'A' ? 'home' : 'away'
			return Object.keys(data).reduce((filtered, s) => {
				if (data[s].local == local && s != this.form.goal) {
					filtered.push({
						id: s,
						name: data[s].name,
						nickname: data[s].nickname
					})
				}
				return filtered
			}, [])
		},
		getMinute() {
			let dateMatch = moment(this.match.beginTime.toDate())
			let dateGoal = new Date(this.form.date + 'T' + this.form.time + 'Z')
			return moment(dateGoal).diff(dateMatch, 'minute')
		}
	},
	data() {
		return {
			urlTimeDisabled: true,
			form: {
				local: 'A',
				assist: null,
				goal: null,
				match: null,
				team: null,
				otherTeam: null,
				time: '',
				timeMin: 0,
				type: 'N',
				url: { link: '', time: '00:00:00' },
				players: {},
				props: {}
			},
			show: true
		}
	},
	methods: {
		...mapActions('goals', ['getGoalsFromMatch', 'addGoal']),
		async pasteLink() {
			await this.$nextTick()
			this.form.url.link = await navigator.clipboard.readText()
			let query = getQueryParams('t', this.form.url.link)
			this.urlTimeDisabled = false
			if (query) {
				this.form.url.time = secondsToTime(query)
			}
		},
		deleteLink() {
			this.form.url = { link: '', time: '00:00:00' }
		},
		changeTimeLink(value) {
			this.form.url.link = updateURLParameter(
				this.form.url.link,
				't',
				timeToSeconds(value)
			)
		},
		async setTeamId() {
			await this.$nextTick()
			let localOwnGoal = this.form.local == 'A' ? 'B' : 'A'
			this.form.team = this.match['team' + this.form.local].id
			this.form.otherTeam = this.match['team' + localOwnGoal].id
			this.form.goal = null
			this.form.assist = null
		},
		async checkToggle() {
			this.form.assist = null
		},
		async onSubmit(evt) {
			evt.preventDefault()
			await this.addGoal(this.form)
			this.$noty.success('Golo Adicionado!')
			this.form.assist = null
			this.form.goal = null
			this.form.type = 'N'
			this.form.url.link = ''
			this.form.url.time = '00:00:00'
			this.urlTimeDisabled = true
			this.form.players = {}
			this.form.props = {}
			this.show = false
			await this.$nextTick()
			this.show = true
		},
		async onReset(evt) {
			evt.preventDefault()
		}
	},
	async fetch({ store, route }) {
		try {
			await store.dispatch('matches/getMatchByIdOnce', route.query.match)
			await store.dispatch('goals/getGoalsFromMatch', route.query.match)
		} catch (e) {
			console.error(e)
		}
	},
	async mounted() {
		try {
			console.log(this.match)
			let date = moment(
				this.match.beginTime
					.toDate()
					.toLocaleString('pt-PT', { timeZone: 'UTC' }),
				'DD/MM/YYYY, HH:mm:ss'
			)
			this.form.date = date.format('YYYY-MM-DD')
			this.form.time = date.format('HH:mm:ss')
			this.form.match = this.match.id
			this.form.team = this.match.teamA.id
			this.form.otherTeam = this.match.teamB.id
		} catch (e) {
			console.error(e)
		}
	}
}
</script>
