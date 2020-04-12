<template>
  <div class="content-page">
    <b-row>
      <b-col cols="12" md="6" lg="6">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-row>
            <b-col cols="12">
              <b-card>
                <b-row>
                  <b-col cols="12" class="text-center">
                    <div style="display: inline-flex;">
                      <b-form-checkbox
                        v-model="teamLetter"
                        value="B"
                        unchecked-value="A"
                        size="sm"
                        switch
                      ></b-form-checkbox>
                    </div>
                    <div style="display: inline-flex;">
                      <div class="letterRound text-center">
                        <b>{{ teamLetter}}</b>
                      </div>
                    </div>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="6" style="min-height: 136px;">
                    <b-table
                      class="formPlayersA"
                      :items="formA.players"
                      :fields="[{key:'name',label:'Equipa A'},{key:'actions',label:''}]"
                    >
                      <template v-slot:cell(actions)="row">
                        <b-button
                          size="sm"
                          class="btnNoBorder p-0"
                          variant="outline-danger"
                          @click="delPlayerFromTeam(row.item)"
                          :disabled="teamLetter=='B'"
                        >
                          <span class="dl dl-remover"></span>
                        </b-button>
                      </template>
                    </b-table>
                  </b-col>
                  <b-col cols="6" class="text-right" style="min-height: 136px;">
                    <b-table
                      class="formPlayersB"
                      :items="formB.players"
                      :fields="[{key:'actions',label:''},{key:'name',label:'Equipa B'}]"
                    >
                      <template v-slot:cell(actions)="row">
                        <b-button
                          size="sm"
                          class="btnNoBorder p-0"
                          variant="outline-danger"
                          @click="delPlayerFromTeam(row.item)"
                          :disabled="teamLetter=='A'"
                        >
                          <span class="dl dl-remover"></span>
                        </b-button>
                      </template>
                    </b-table>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="12">
                    <b-table
                      id="my-table-scroll"
                      class="my-table-scroll"
                      :items="playersUnselected"
                      :fields="[{key:'name',label:'Jogador'},{key:'actions',label:''}]"
                    >
                      <template v-slot:cell(actions)="row">
                        <b-button
                          size="sm"
                          class="btnarrowleft p-0"
                          variant="outline-primary"
                          @click="addPlayerToTeam(row.item)"
                        >
                          <span class="dl dl-plus"></span>
                        </b-button>
                      </template>
                    </b-table>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-card>
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
            </b-col>
          </b-row>
        </b-form>
        <b-row class="mt-2">
          <b-col cols="6" md="6">
            <b-card header="Equipa A">
              <pre class="m-0">{{ formA }}</pre>
            </b-card>
          </b-col>
          <b-col cols="6" md="6">
            <b-card header="Equipa B">
              <pre class="m-0">{{ formB }}</pre>
            </b-card>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-card v-for="team in teams" :key="team.id" :header="team.id">
            <pre class="m-0">{{ team }}</pre>
          </b-card>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import lodash from 'lodash'

export default {
  name: 'addTeam',
  layout: 'simple',
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
      formA: {
        goals: {},
        match: null,
        players: [],
        local: 'home',
        props: {},
        counter: {
          goals: { total: 0, penalties: 0, penaltiesFailed: 0, ownGoals: 0 },
          assists: { total: 0 }
        }
      },
      formB: {
        goals: {},
        match: null,
        players: [],
        local: 'away',
        props: {},
        counter: {
          goals: { total: 0, penalties: 0, penaltiesFailed: 0, ownGoals: 0 },
          assists: { total: 0 }
        }
      },
      show: true
      // createMatch: false
    }
  },
  methods: {
    ...mapActions('teams', ['getTeams', 'addTeam']),
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
      await this.addTeam(this.formA)
      await this.addTeam(this.formB)
      // if (createMatch) await this.setMatch()
    },
    async onReset(evt) {
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
      await this.$nextTick()
      this.show = true
    }
  },
  async fetch({ store }) {
    try {
      await store.dispatch('players/getPlayers')
      // await store.dispatch('teams/getTeams')
    } catch (e) {
      console.error(e)
    }
  }
}
</script>