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
                <b-icon-plus @click="addPlayerToTeam(row.item)" />
              </template>
            </b-table>
          </b-col>
          <b-col cols="3">
            <b-table
              :items="formA.players"
              :fields="[{key:'name',label:'Equipa A'},{key:'actions',label:''}]"
            >
              <template v-slot:cell(actions)="row">
                <b-icon-dash :hidden="teamLetter=='B'" @click="delPlayerFromTeam(row.item)" />
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
              :items="formB.players"
              :fields="[{key:'name',label:'Equipa B'},{key:'actions',label:''}]"
            >
              <template v-slot:cell(actions)="row">
                <b-icon-dash :hidden="teamLetter=='A'" @click="delPlayerFromTeam(row.item)" />
              </template>
            </b-table>
          </b-col>
        </b-row>
      </b-card>
      <b-card class="m-3">
        <b-row>
          <!-- <b-col>
            <b-form-checkbox class="mx-3" v-model="createMatch" size="sm">Criar Jogo</b-form-checkbox>
          </b-col>-->
          <b-col>
            <b-button class="mr-2" size="sm" type="submit" variant="primary">Submeter</b-button>
            <b-button size="sm" type="reset" variant="danger">Limpar</b-button>
          </b-col>
        </b-row>
      </b-card>
    </b-form>
    <client-only>
      <b-row class="m-3">
        <b-card class="mt-3" header="Equipa A">
          <pre class="m-0">{{ formA }}</pre>
        </b-card>
        <b-card class="mt-3" header="Equipa B">
          <pre class="m-0">{{ formB }}</pre>
        </b-card>
      </b-row>
      <b-row class="m-3">
        <b-card class="mr-2" v-for="team in teams" :key="team.id" :header="team.id">
          <pre class="m-0">{{ team }}</pre>
        </b-card>
      </b-row>
    </client-only>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'addTeam',
  layout: 'dev-add',
  computed: {
    ...mapState('teams', ['teams']),
    playersSelected() {
      return this.players.filter(function(s) {
        return s.selected
      })
    },
    playersUnselected() {
      return this.players.filter(function(s) {
        return !s.selected
      })
    }
  },
  data() {
    return {
      players: [],
      teamLetter: 'A',
      formA: {
        goals: {},
        match: null,
        players: [],
        props: {}
      },
      formB: {
        goals: {},
        match: null,
        players: [],
        props: {}
      },
      show: true
      // createMatch: false
    }
  },
  methods: {
    ...mapActions('players', ['getPlayersStatic']),
    ...mapActions('teams', ['getTeams', 'setTeam']),
    addPlayerToTeam(player) {
      this['form' + this.teamLetter].players.push({
        id: player.id,
        name: player.name
      })
      player.selected = true
    },
    delPlayerFromTeam(player) {
      let i = this['form' + this.teamLetter].players.indexOf(player) // find index of your object
      this['form' + this.teamLetter].players.splice(i, 1)
      this.players.find((element) => element.id == player.id).selected = false
    },
    async onSubmit(evt) {
      evt.preventDefault()
      await this.setTeam(this.formA)
      await this.setTeam(this.formB)
      // if (createMatch) await this.setMatch()
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.formA.goals = {}
      this.formA.match = null
      this.formA.players = []
      this.formA.props = {}

      this.formB.goals = {}
      this.formB.match = null
      this.formB.players = []
      this.formB.props = {}

      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  },
  async fetch({ store }) {
    try {
      this.players = await store.dispatch('players/getPlayersStatic')
      await store.dispatch('teams/getTeams')
    } catch (e) {
      console.error(e)
    }
    console.log(store.state.teams)
  },
  async mounted() {
    try {
      this.players = await this.getPlayersStatic()
      await this.getTeams()
    } catch (e) {
      console.error(e)
    }
    console.log(this.teams)
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
