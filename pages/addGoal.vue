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
                        <b-row v-if="isSameTeam(goal,'A')" class="my-1">
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
                        <b-row v-if="isSameTeam(goal,'B')" class="my-1">
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
                            v-model="teamLetter"
                            value="B"
                            unchecked-value="A"
                            switch
                          >
                            <b>{{teamLetter}}</b>
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
                          <b-form-timepicker required id="input-1" v-model="form.time"></b-form-timepicker>
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
        <client-only>
          <!-- <b-card class="mr-2" :header="match.id">
          <pre class="m-0">{{ match }}</pre>
          </b-card>-->
          <b-card v-for="goal in goals" :key="goal.id" :header="goal.id">
            <pre>{{ goal }}</pre>
          </b-card>
        </client-only>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import isTimestamp from '../utils/isTimestamp'

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
			// return []
			return this.match['team' + this.teamLetter].players
		},
		playersAssist() {
			// return []
			return this.match['team' + this.teamLetter].players.filter((s) => {
				return s.id != this.form.goal
			})
		}
	},
	data() {
		return {
			teamLetter: 'A',
			form: {
				assist: null,
				goal: null,
				match: null,
				team: null,
				time: '',
				timeMin: 0,
				type: 'N',
				props: {}
			},
			show: true
		}
	},
	methods: {
		...mapActions('matches', ['getMatchByIdStatic']),
		...mapActions('goals', ['getGoalsFromMatch', 'setGoal']),
		isSameTeam(goal, letter) {
			// console.log(goal, this.match)
			let goalId = goal.team ? goal.team.id : null
			let matchId = this.match['team' + letter]
				? this.match['team' + letter].id
				: null
			return goalId == matchId
			// return (letter = 'A' ? true : false)
		},
		setTeamId() {
			this.$nextTick(() => {
				this.form.team = this.match['team' + this.teamLetter].id
			})
		},
		async onSubmit(evt) {
			evt.preventDefault()
			await this.setGoal(this.form)
			this.form.assist = null
			this.form.goal = null
			this.form.type = 'N'
			this.form.props = {}
			this.show = false
			this.$nextTick(() => {
				this.show = true
			})
		},
		async onReset(evt) {
			evt.preventDefault()
		}
	},
	async fetch({ store, route }) {
		try {
			await store.dispatch('goals/getGoalsFromMatch', route.query.match)
			// await store.dispatch('matches/getMatchByIdStatic', route.query.match)
		} catch (e) {
			console.error(e)
		}
	},
	async mounted() {
		try {
			await this.getMatchByIdStatic(this.routerQuery.match)
			await this.getGoalsFromMatch(this.routerQuery.match)
			console.log(this.match)
			this.form.time = this.match.beginTime
				.toDate()
				.toLocaleTimeString('pt-PT', { timeZone: 'UTC' })
			this.form.match = this.match.id
			this.form.team = this.match.teamA.id
		} catch (e) {
			console.error(e)
		}
	}
}
</script>
