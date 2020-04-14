<template>
  <div class="content-page">
    <b-row>
      <b-col cols="12" md="6" lg="6">
        <b-row>
          <b-col cols="12">
            <b-card>
              <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                <b-form-group id="input-group-1" label="Nome:" label-for="input-1">
                  <b-form-input id="input-2" v-model="form.name" required placeholder="Enter name"></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Alcunha:" label-for="input-2">
                  <b-form-input
                    id="input-2"
                    v-model="form.nickname"
                    required
                    placeholder="Enter nick"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  class="mb-3"
                  id="input-group-3"
                  label="Data de Nascimento:"
                  label-for="input-3"
                >
                  <b-form-datepicker id="input-3" v-model="form.dob"></b-form-datepicker>
                </b-form-group>
                <b-form-group id="input-group-4" label label-for="input-4">
                  <b-form-input id="input-4" v-model="form.dob" required placeholder></b-form-input>
                </b-form-group>

                <b-btn type="submit" variant="primary">Submit</b-btn>
                <b-btn type="reset" variant="danger">Reset</b-btn>
              </b-form>
            </b-card>
          </b-col>
        </b-row>
        <!-- <b-row>
          <b-col cols="12">
            <b-card class="mt-1" header="Form Data Result">
              <pre class="m-0">{{ form }}</pre>
            </b-card>
          </b-col>
        </b-row>-->
      </b-col>
    </b-row>
    <!-- <b-row class="m-3">
      <b-card class="mr-2" v-for="player in players" :key="player.id" :header="player.name">
        <pre class="m-0">{{ player }}</pre>
      </b-card>
    </b-row>-->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	name: 'addPlayer',
	layout: 'simple',
	computed: {
		...mapState('players', ['players'])
	},
	data() {
		return {
			form: {
				assists: {},
				goals: {},
				matches: {},
				teams: {},
				dob: '',
				name: '',
				nickname: '',
				counter: {
					goals: {
						home: 0,
						away: 0,
						total: 0,
						penalties: 0,
						penaltiesFailed: 0,
						ownGoals: 0
					},
					assists: { home: 0, away: 0, total: 0 },
					teams: { home: 0, away: 0 },
					matches: { total: 0 }
				},
				props: {}
			},
			show: true
		}
	},
	methods: {
		...mapActions('players', ['getPlayers', 'addPlayer']),
		async onSubmit(evt) {
			evt.preventDefault()
			// Timestamp.fromDate(new Date()),
			await this.addPlayer(this.form)
			this.$noty.success('Jogador Adicionado!')
		},
		async onReset(evt) {
			evt.preventDefault()
			// Reset our form values
			this.form.assists = {}
			this.form.goals = {}
			this.form.matches = {}
			this.form.teams = {}
			this.form.dob = ''
			this.form.name = ''
			this.form.nickname = ''

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
		console.log(store.state.players)
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
