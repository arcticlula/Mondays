<template>
  <div class="content-page">
    <b-row>
      <b-col cols="12" md="6" lg="6">
        <b-card>
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-row>
              <b-col cols="12">
                <b-form-group id="input-group-1" label="Nome:" label-for="input-1">
                  <b-form-input id="input-2" v-model="form.name" required placeholder="Enter name"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group id="input-group-2" label="Alcunha:" label-for="input-2">
                  <b-form-input
                    id="input-2"
                    v-model="form.nickname"
                    required
                    placeholder="Enter nick"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group
                  class="mb-3"
                  id="input-group-3"
                  label="Data de Nascimento:"
                  label-for="input-3"
                >
                  <b-form-datepicker id="input-3" v-model="form.dob"></b-form-datepicker>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group
                  class="mb-4"
                  id="input-group-5"
                  label="Escolher imagem do jogador:"
                  label-for="input-5"
                >
                  <b-form-file
                    id="input-5"
                    @change="previewImage"
                    v-model="form.file"
                    :state="Boolean(form.file)"
                    placeholder="Choose a file or drop it here..."
                    drop-placeholder="Drop file here..."
                    accept="image/*"
                    size="sm"
                    class="mb-2"
                  ></b-form-file>
                  <img
                    class="preview mb-3"
                    :src="imageData"
                    onerror="require(`@/assets/players/playernull.jpg`)"
                  />
                  <!-- <b-progress class="mb-2" :value="uploadValue" max="100"></b-progress> -->
                </b-form-group>
                <!-- <b-row>
                  <b-col cols="9" lg="10" style="align-self: center;">

                     <img class="preview" :src="player.picture" /> 
                  </b-col>
                  <b-col cols="3" lg="2" style="align-self: center; text-align: right;">
                    <b-btn variant="outline-primary" size="sm" @click="onUpload">Upload</b-btn>
                  </b-col>
                </b-row>-->
              </b-col>
              <b-col cols="12">
                <b-btn type="submit" size="sm" variant="primary">Submeter</b-btn>
                <b-btn type="reset" size="sm" variant="danger">Limpar</b-btn>
              </b-col>
            </b-row>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
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
        picture: null,
        file: null,
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
      show: true,
      imageData: null
    }
  },
  methods: {
    ...mapActions('players', ['getPlayers', 'addPlayer']),
    previewImage(event) {
      let pic = event.target.files[0]
      this.imageData = pic ? URL.createObjectURL(pic) : null
    },
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
      this.form.file = null
      this.form.picture = null
      this.imageData = null
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
img.preview {
  max-width: 100%;
  max-height: 200px;
}
</style>
