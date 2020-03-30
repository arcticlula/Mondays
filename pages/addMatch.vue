<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-card class="m-3">
        <b-row>
          <b-col cols="6">
            <b-form-group class="mb-3" id="input-group-1" label="Data:" label-for="input-1">
              <b-form-datepicker required id="input-1" v-model="form.date"></b-form-datepicker>
            </b-form-group>
            <b-form-group class="mb-3" id="input-group-2" label="Hora Início:" label-for="input-2">
              <b-form-timepicker id="input-2" v-model="form.beginTime"></b-form-timepicker>
            </b-form-group>
            <b-form-group class="mb-3" id="input-group-3" label="Hora Fim:" label-for="input-3">
              <b-form-timepicker id="input-3" v-model="form.endTime"></b-form-timepicker>
            </b-form-group>
            <b-form-group class="mb-3" id="input-group-4" label="Equipa Casa:" label-for="input-4">
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
            </b-form-group>
          </b-col>
          <b-col cols="3">
            <b-table :items="teamPlayersA" :fields="[{key:'name',label:'Equipa Casa'}]"></b-table>
          </b-col>
          <b-col cols="3">
            <b-table :items="teamPlayersB" :fields="[{key:'name',label:'Equipa Fora'}]"></b-table>
          </b-col>
        </b-row>
      </b-card>
      <b-card class="m-3">
        <b-row>
          <b-col>
            <b-button class="mr-2" size="sm" type="submit" variant="primary">Submeter</b-button>
            <b-button size="sm" type="reset" variant="danger">Limpar</b-button>
          </b-col>
        </b-row>
      </b-card>
    </b-form>

    <b-row class="m-3">
      <b-card class="mt-3" header="Jogo">
        <pre class="m-0">{{ form }}</pre>
      </b-card>
    </b-row>
    <b-row class="m-3">
      <b-card class="mr-2" v-for="match in matches" :key="match.id" :header="match.id">
        <pre class="m-0">{{ match }}</pre>
      </b-card>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'addMatch',
  layout: 'dev-add',
  computed: {
    ...mapState('teams', ['teams']),
    ...mapState('matches', ['matches']),
    teamsUnselected() {
      return this.teams.filter((s) => {
        return !s.match
      })
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
        goals: {},
        teamA: '',
        teamB: '',
        players: {},
        props: {},
        counter: {
          goals: { home: 0, away: 0, total: 0, penalties: 0, ownGoals: 0 },
          assists: { home: 0, away: 0, total: 0 }
        }
      },
      show: true
    }
  },
  methods: {
    ...mapActions('teams', ['getTeams']),
    ...mapActions('matches', ['getMatches', 'setMatch']),

    async onSubmit(evt) {
      evt.preventDefault()
      await this.setMatch(this.form)
    },
    onReset(evt) {
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
      this.$nextTick(() => {
        this.show = true
      })
    }
  },
  async fetch({ store }) {
    try {
      await store.dispatch('teams/getTeams')
      await store.dispatch('matches/getMatches')
    } catch (e) {
      console.error(e)
    }
  },
  async mounted() {
    try {
      await this.getTeams()
      await this.getMatches()
    } catch (e) {
      console.error(e)
    }
  }
}
</script>
