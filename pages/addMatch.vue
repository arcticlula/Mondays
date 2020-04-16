<template>
  <div class="content-page">
    <b-row>
      <b-col cols="12" md="6" lg="6">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-card>
            <b-row>
              <b-col cols="12">
                <b-form-group class="mb-3" id="input-group-1" label="Data:" label-for="input-1">
                  <b-form-datepicker required id="input-1" v-model="form.date"></b-form-datepicker>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <b-form-group
                  class="mb-3"
                  id="input-group-2"
                  label="Hora Início:"
                  label-for="input-2"
                >
                  <b-form-timepicker id="input-2" v-model="form.beginTime"></b-form-timepicker>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <b-form-group class="mb-3" id="input-group-3" label="Hora Fim:" label-for="input-3">
                  <b-form-timepicker id="input-3" v-model="form.endTime"></b-form-timepicker>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <b-form-group
                  class="mb-3"
                  id="input-group-4"
                  label="Equipa Casa:"
                  label-for="input-4"
                >
                  <b-form-select
                    :options="teamsUnselected"
                    value-field="id"
                    text-field="local"
                    id="input-4"
                    v-model="form.teamA"
                  ></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <b-form-group
                  class="mb-3"
                  id="input-group-5"
                  label="Equipa Fora"
                  label-for="input-5"
                >
                  <b-form-select
                    :options="teamsUnselected"
                    value-field="id"
                    text-field="local"
                    id="input-5"
                    v-model="form.teamB"
                  ></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="6">
                <b-table :items="teamPlayersA" :fields="[{key:'name',label:'Equipa Casa'}]"></b-table>
              </b-col>
              <b-col cols="6">
                <b-table :items="teamPlayersB" :fields="[{key:'name',label:'Equipa Fora'}]"></b-table>
              </b-col>
            </b-row>
          </b-card>
          <b-card class="mt-1">
            <b-row>
              <b-col>
                <b-btn class="mr-2" size="sm" type="submit" variant="primary">Submeter</b-btn>
                <b-btn size="sm" type="reset" variant="danger">Limpar</b-btn>
              </b-col>
            </b-row>
          </b-card>
        </b-form>
        <b-row>
          <b-col cols="12">
            <b-card class="mt-3" header="Jogo">
              <pre class="m-0">{{ form }}</pre>
            </b-card>
          </b-col>
        </b-row>
        <!-- <b-row class="m-3">
      <b-card class="mr-2" v-for="match in matches" :key="match.id" :header="match.id">
        <pre class="m-0">{{ match }}</pre>
      </b-card>
        </b-row>-->
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { isEmpty } from 'lodash'

export default {
  name: 'addMatch',
  layout: 'simple',
  computed: {
    ...mapState('teams', ['teams']),
    ...mapState('matches', ['matches']),
    teamsUnselected() {
      return !isEmpty(this.teams)
        ? this.teams.filter((s) => {
            return !s.match
          })
        : []
    },
    teamPlayersA() {
      return this.form.teamA == ''
        ? []
        : this.teams.find((element) => element.id == this.form.teamA).players
    },
    teamPlayersB() {
      return this.form.teamB == ''
        ? []
        : this.teams.find((element) => element.id == this.form.teamB).players
    }
  },
  data() {
    return {
      form: {
        date: null,
        beginTime: '22:00:00',
        endTime: '23:00:00',
        durationMin: 0,
        goals: {},
        teamA: '',
        teamB: '',
        players: {},
        props: {},
        counter: {
          goals: {
            home: 0,
            away: 0,
            total: 0,
            penalties: 0,
            penaltiesFailed: 0,
            ownGoals: 0
          },
          assists: { home: 0, away: 0, total: 0 }
        }
      },
      show: true
    }
  },
  methods: {
    ...mapActions('teams', ['getTeams']),
    ...mapActions('matches', ['getMatches', 'addMatch']),

    async onSubmit(evt) {
      evt.preventDefault()
      await this.addMatch(this.form)
      this.$noty.success('Jogo Adicionado!')
    },
    async onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.date = null
      this.form.beginTime = '22:00:00'
      this.form.endTime = '23:00:00'
      this.form.goals = {}
      this.form.teamA = null
      this.form.teamB = null
      this.form.props = {}

      // Trick to reset/clear native browser form validation state
      this.show = false
      await this.$nextTick()
      this.show = true
    }
  },
  async fetch({ store }) {
    try {
      await store.dispatch('teams/getTeams')
      // await store.dispatch('matches/getMatches')
    } catch (e) {
      console.error(e)
    }
  }
}
</script>
