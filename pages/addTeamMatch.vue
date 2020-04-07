<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-card class="m-3">
        <b-row>
          <b-col cols="4">
            <b-table
              class="my-table-scroll"
              :items="playersUnselected"
              :fields="[{key:'name',label:'Jogador'},{key:'actions',label:''}]"
            >
              <template v-slot:cell(actions)="row">
                <span @click="addPlayerToTeam(row.item)">+</span>
              </template>
            </b-table>
          </b-col>
          <b-col cols="3">
            <b-table
              :items="formTeamA.players"
              :fields="[{key:'name',label:'Equipa Casa'},{key:'actions',label:''}]"
            >
              <template v-slot:cell(actions)="row">
                <span :hidden="teamLetter=='B'" @click="delPlayerFromTeam(row.item)">-</span>
              </template>
            </b-table>
          </b-col>
          <b-col cols="2">
            <b-form-checkbox v-model="teamLetter" value="B" unchecked-value="A" size="sm" switch>
              <b>{{ teamLetter}}</b>
            </b-form-checkbox>
          </b-col>
          <b-col cols="3">
            <b-table
              :items="formTeamB.players"
              :fields="[{key:'name',label:'Equipa Fora'},{key:'actions',label:''}]"
            >
              <template v-slot:cell(actions)="row">
                <span :hidden="teamLetter=='A'" @click="delPlayerFromTeam(row.item)">-</span>
              </template>
            </b-table>
          </b-col>
        </b-row>
      </b-card>
    </b-form>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-card class="m-3">
        <b-row>
          <b-col cols="6">
            <b-form-group class="mb-3" id="input-group-1" label="Data:" label-for="input-1">
              <b-form-datepicker required id="input-1" v-model="formMatch.date"></b-form-datepicker>
            </b-form-group>
            <b-form-group class="mb-3" id="input-group-2" label="Hora Início:" label-for="input-2">
              <b-form-timepicker id="input-2" v-model="formMatch.beginTime"></b-form-timepicker>
            </b-form-group>
            <b-form-group class="mb-3" id="input-group-3" label="Hora Fim:" label-for="input-3">
              <b-form-timepicker id="input-3" v-model="formMatch.endTime"></b-form-timepicker>
            </b-form-group>
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
        <pre class="m-0">{{ formMatch }}</pre>
      </b-card>
      <b-card class="mt-3" header="Equipa Casa">
        <pre class="m-0">{{ formTeamA }}</pre>
      </b-card>
      <b-card class="mt-3" header="Equipa Fora">
        <pre class="m-0">{{ formTeamB }}</pre>
      </b-card>
    </b-row>
    <!-- <b-row class="m-3">
      <b-card class="mr-2" v-for="team in teams" :key="team.id" :header="team.id">
        <pre class="m-0">{{ team }}</pre>
      </b-card>
    </b-row>-->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import lodash from 'lodash'

export default {
  name: 'addTeam',
  layout: 'dev-add',
  computed: {
    ...mapState('teams', ['teams']),
    ...mapState('players', ['players']),
    playersSelected() {
      let players = !_.isEmpty(this.players) ? this.players : []
      return players.filter(function(s) {
        return s.selected
      })
    },
    playersUnselected() {
      let players = !_.isEmpty(this.players) ? this.players : []
      return players.filter(function(s) {
        return !s.selected
      })
    }
  },
  data() {
    return {
      teamLetter: 'A',
      formTeamA: {
        goals: {},
        match: null,
        players: [],
        local: 'home',
        props: {},
        counter: {
          goals: { total: 0, penalties: 0, ownGoals: 0 },
          assists: { total: 0 }
        }
      },
      formTeamB: {
        goals: {},
        match: null,
        players: [],
        local: 'away',
        props: {},
        counter: {
          goals: { total: 0, penalties: 0, ownGoals: 0 },
          assists: { total: 0 }
        }
      },
      formMatch: {
        date: null,
        beginTime: '22:00:00',
        endTime: '23:00:00',
        teamA: null,
        teamB: null,
        goals: {},
        players: {},
        props: {},
        counter: {
          goals: {
            home: 0,
            away: 0,
            total: 0,
            penalties: 0,
            ownGoals: 0
          },
          assists: { home: 0, away: 0, total: 0 }
        }
      },
      show: true
      // createMatch: false
    }
  },
  methods: {
    ...mapActions('matches', ['addTeamsMatch']),
    addPlayerToTeam(player) {
      this['formTeam' + this.teamLetter].players.push({
        id: player.id,
        name: player.name,
        nickname: player.nickname
      })
      player.selected = true
    },
    delPlayerFromTeam(player) {
      let i = this['formTeam' + this.teamLetter].players.indexOf(player) // find index of your object
      this['formTeam' + this.teamLetter].players.splice(i, 1)
      this.players.find((element) => element.id == player.id).selected = false
    },
    async onSubmit(evt) {
      evt.preventDefault()
      await this.addTeamsMatch({
        formTeamA: this.formTeamA,
        formTeamB: this.formTeamB,
        formMatch: this.formMatch
      })
      this.$noty.success('Jogo Adicionado!')
      // if (createMatch) await this.setMatch()
    },
    async onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.formTeamA.goals = {}
      this.formTeamA.match = null
      this.formTeamA.players = []
      this.formTeamA.props = {}

      this.formTeamB.goals = {}
      this.formTeamB.match = null
      this.formTeamB.players = []
      this.formTeamB.props = {}

      this.formMatch.date = null
      this.formMatch.beginTime = '22:00:00'
      this.formMatch.endTime = '23:00:00'
      this.formMatch.goals = {}
      this.formMatch.teamA = null
      this.formMatch.teamB = null
      this.formMatch.props = {}

      // Trick to reset/clear native browser form validation state
      this.show = false
      await this.$nextTick()
      this.show = true
    }
  },
  async fetch({ store }) {
    try {
      await store.dispatch('players/getPlayers')
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
table.my-table-scroll,
table.my-table-scroll > thead,
table.my-table-scroll > tbody,
table.my-table-scroll > tfoot,
table.my-table-scroll > tbody > tr,
table.my-table-scroll > thead > tr {
  width: 100%;
  display: block;
}

table.my-table-scroll > thead,
table.my-table-scroll > tbody,
table.my-table-scroll > tfoot {
  display: block;
  width: 100%;
  overflow-y: scroll;
}

table.my-table-scroll > thead,
table.my-table-scroll > tfoot {
  height: auto;
}

table.my-table-scroll > tbody {
  max-height: 300px;
}

table.my-table-scroll > thead > tr > th,
table.my-table-scroll > thead > tr > td,
table.my-table-scroll > tbody > tr > th,
table.my-table-scroll > tbody > tr > td,
table.my-table-scroll > tfoot > tr > th,
table.my-table-scroll > tfoot > tr > td {
  display: inline-block;
  width: 50%;
}
</style>
