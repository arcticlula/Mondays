
<template>
  <b-modal
    v-model="modal.showGoal"
    title="Editar Golo"
    header-bg-variant="dark"
    header-text-variant="light"
    body-bg-variant="light"
    body-text-variant="dark"
    footer-bg-variant="light"
  >
    <b-container fluid>
      <b-row class="mb-2">
        <b-col>
          <b-form-group class="mb-3" id="modal-group-0" label="Hora do golo:" label-for="modal-0">
            <b-form-timepicker
              show-seconds
              @input="setTimeMin"
              id="modal-0"
              v-model="goalEdit.time"
            ></b-form-timepicker>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group class="mb-3" id="modal-group-1" label="Minuto do jogo:" label-for="modal-1">
            <b-form-input
              class="text-right"
              :readonly="true"
              id="modal-1"
              :value="goalEdit.timeMin"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col>
          <b-form-group class="mb-3" id="modal-group-2" label="Link Youtube:" label-for="modal-2">
            <b-form-input
              id="modal-2"
              @paste="pasteLink"
              v-model="goalEdit.URLLink"
              placeholder="Link Youtube"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col>
          <b-form-timepicker
            :disabled="urlTimeDisabled"
            seconds-step="5"
            show-seconds
            v-model="goalEdit.URLTime"
            @input="changeTimeLink"
          ></b-form-timepicker>
        </b-col>
        <b-col>
          <b-row>
            <b-btn class="mb-3 ml-2" size="sm" variant="outline-secondary" @click="pasteLink">
              <i class="dl dl-paste"></i>
            </b-btn>
            <b-btn class="mb-3 ml-2" size="sm" variant="outline-secondary" @click="deleteLink">
              <i class="dl dl-eliminar"></i>
            </b-btn>
          </b-row>
        </b-col>
      </b-row>
      <br />
      <br />
    </b-container>

    <template v-slot:modal-footer>
      <div class="w-100">
        <b-button
          v-if="canDeleteGoals"
          variant="outline-primary"
          size="sm"
          @click="deleteGoal"
        >Apagar Golo</b-button>
        <b-button
          variant="outline-primary"
          size="sm"
          class="float-right"
          @click="editionGoal"
        >Gravar</b-button>
        <b-button
          variant="outline-primary"
          size="sm"
          class="float-right"
          @click="modal.showGoal=false"
        >Fechar</b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

import { secondsToTime, timeToSeconds } from '../utils/time'
import { getQueryParams, updateURLParameter } from '../utils/url'
import moment from 'moment'
import { isEmpty } from 'lodash'
import Noty from 'noty'

export default {
  name: 'modalEditGoal',
  data() {
    return {
      urlTimeDisabled: true
    }
  },
  computed: {
    ...mapState(['modal']),
    ...mapState('goals', ['goal', 'goalEdit']),
    ...mapGetters(['canDeleteGoals']),
    ...mapGetters('goals', ['hasGoals'])
  },
  methods: {
    ...mapActions('goals', ['editGoal', 'delGoal', 'setTimeMin']),
    async pasteLink() {
      await this.$nextTick()
      this.goalEdit.URLLink = await navigator.clipboard.readText()
      let query = getQueryParams('t', this.goalEdit.URLLink)
      this.urlTimeDisabled = false
      if (query) {
        this.goalEdit.URLTime = secondsToTime(query)
      }
    },
    deleteLink() {
      this.goalEdit.URLLink = ''
      this.goalEdit.URLTime = '00:00:00'
    },
    changeTimeLink(value) {
      this.goalEdit.URLLink = updateURLParameter(
        this.goalEdit.URLLink,
        't',
        timeToSeconds(value)
      )
    },
    async editionGoal() {
      await this.editGoal()
      this.$noty.info('Golo Actualizado!')
      this.urlTimeDisabled = true
      this.modal.showGoal = false
    },
    async deleteGoal() {
      await this.delGoal(this.goal)
      this.$noty.warning('Golo Removido!')
      this.modal.showGoal = false
    }
  }
}
</script>

<style scoped>
</style>
