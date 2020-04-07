<template>
  <div>
    <b-row class="px-2">
      <b-col cols="12" md="9">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-card class="mt-1">
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
                    <div v-for="goal in goals" :key="goal.id">
                      <div v-if="!goal.isOwnGoal">
                        <b-row v-if="goal.local=='home'" class="my-1">
                          <b-col cols="12">
                            <label class="pr-1">{{goal.timeMin}}</label>
                            <i class="dl dl-bola"></i>
                            <label class="pr-1">
                              <b>{{getNameGoal(goal)}}</b>
                            </label>
                            <label v-if="!!goal.assist">({{getNameAssist(goal)}})</label>
                            <label v-else-if="goal.isPenalty">(Penalidade)</label>
                            <span @click="deleteGoal(goal)">x</span>
                          </b-col>
                        </b-row>
                        <b-row v-else class="my-1">
                          <b-col cols="12" class="text-right">
                            <span @click="deleteGoal(goal)">x</span>
                            <label v-if="!!goal.assist" class="pr-1">({{getNameAssist(goal)}})</label>
                            <label v-else-if="goal.isPenalty">(Penalidade)</label>
                            <label class="pr-1">
                              <b>{{getNameGoal(goal)}}</b>
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
                              <b>{{getNameGoal(goal)}}</b>
                            </label>
                            <label>(Auto-Golo)</label>
                            <span @click="deleteGoal(goal)">x</span>
                          </b-col>
                        </b-row>
                        <b-row v-else class="my-1">
                          <b-col cols="12" class="text-right">
                            <span @click="deleteGoal(goal)">x</span>
                            <label class="pr-1">(Auto-Golo)</label>
                            <label class="pr-1">
                              <b>{{getNameGoal(goal)}}</b>
                            </label>
                            <i class="dl dl-bola text-red"></i>
                            <label class="pl-1">{{goal.timeMin}}</label>
                          </b-col>
                        </b-row>
                      </div>
                    </div>
                  </b-col>
                </b-card-text>
              </b-col>
            </b-row>
          </b-card>
          <b-card class="mt-1">
            <b-row>
              <b-col cols="12" md="11">
                <b-row>
                  <b-col cols="12" md="6">
                    <b-row>
                      <b-col cols="12" md="3">
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
                      <b-col cols="12" md="4">
                        <b-form-group
                          class="mb-3 ml-3"
                          id="input-group-1"
                          label="Tempo:"
                          label-for="input-1"
                        >
                          <b-form-timepicker show-seconds required id="input-1" v-model="form.time"></b-form-timepicker>
                        </b-form-group>
                      </b-col>
                      <b-col cols="12" md="5">
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
                            text-field="name"
                            id="input-2"
                            v-model="form.goal"
                          ></b-form-select>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col cols="12" md="6">
                    <b-row>
                      <b-col cols="12" md="5">
                        <b-form-group
                          class="mb-3 ml-3"
                          id="input-group-3"
                          label="Assistência:"
                          label-for="input-3"
                        >
                          <b-form-select
                            :disabled="form.type=='O'"
                            :options="playersAssist"
                            value-field="id"
                            text-field="name"
                            id="input-3"
                            v-model="form.assist"
                          ></b-form-select>
                        </b-form-group>
                      </b-col>
                      <b-col cols="12" md="7">
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
                              @change="ownGoalToggle"
                            >Auto-Golo</b-form-checkbox>
                            <b-form-checkbox
                              value="P"
                              unchecked-value="N"
                              v-model="form.type"
                            >Penalidade</b-form-checkbox>
                          </b-row>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="1" class="pr-4" style="align-self: center; text-align: right;">
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
      <b-col cols="12" md="3">
        <b-row>
          <b-col cols="12">
            <b-card class="mt-1" header="Jogo">
              <pre>{{ form }}</pre>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row class="px-2 mt-3">
      <b-col cols="12">
        <!-- <b-card class="mr-2" :header="match.id">
          <pre class="m-0">{{ match }}</pre>
        </b-card>-->
        <!-- <b-card v-for="goal in goals" :key="goal.id" :header="goal.id">
          <pre>{{ goal }}</pre>
        </b-card>-->
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import isTimestamp from '../utils/isTimestamp'
import lodash from 'lodash'

export default {
	name: 'addGoal',
	layout: 'dev-add',
	computed: {
		...mapState('matches', ['match', 'matches']),
		...mapState('goals', ['goals']),
		routerQuery() {
			return this.$nuxt.$route.query
		},
		playersScore() {
			let players = this.match['team' + this.form.local].players
			return !!players ? players : null
		},
		playersAssist() {
			let players = this.match['team' + this.form.local].players
			return !!players
				? players.filter((s) => {
						return s.id != this.form.goal
				  })
				: null
		}
	},
	data() {
		return {
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
				players: {},
				props: {}
			},
			show: true
		}
	},
	methods: {
		...mapActions('matches', ['getMatchByIdStatic']),
		...mapActions('goals', ['getGoalsFromMatch', 'addGoal', 'delGoal']),
		getNameGoal(goal) {
			return !_.isEmpty(goal.players) ? goal.players.goal.nickname : ''
			// return !_.isEmpty(goal.goal) ? goal.goal.name : ''
		},
		getNameAssist(goal) {
			return !_.isEmpty(goal.players.assist)
				? goal.players.assist.nickname
				: ''
			// return !_.isEmpty(goal.assist) ? goal.assist.name : ''
		},
		async setTeamId() {
			await this.$nextTick()
			let localOwnGoal = this.form.local == 'A' ? 'B' : 'A'
			this.form.team = this.match['team' + this.form.local].id
			this.form.otherTeam = this.match['team' + localOwnGoal].id
			this.form.goal = null
			this.form.assist = null
		},
		async ownGoalToggle() {
			await this.$nextTick()
			this.form.assist = null
			this.setTeamId()
		},
		async deleteGoal(goal) {
			await this.delGoal(goal)
			this.$noty.warning('Golo Removido!')
		},
		async onSubmit(evt) {
			evt.preventDefault()
			await this.addGoal(this.form)
			this.$noty.success('Golo Adicionado!')
			this.form.assist = null
			this.form.goal = null
			this.form.type = 'N'
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
			await store.dispatch(
				'matches/getMatchByIdStatic',
				route.query.match
			)
			await store.dispatch('goals/getGoalsFromMatch', route.query.match)
		} catch (e) {
			console.error(e)
		}
	},
	async mounted() {
		try {
			console.log(this.match)
			this.form.time = this.match.beginTime
				.toDate()
				.toLocaleTimeString('pt-PT', { timeZone: 'UTC' })
			this.form.match = this.match.id
			this.form.team = this.match.teamA.id
			this.form.otherTeam = this.match.teamB.id
		} catch (e) {
			console.error(e)
		}
	}
}
</script>
