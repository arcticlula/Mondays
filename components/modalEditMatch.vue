
<template>
  <b-modal
    v-model="modal.showMatch"
    title="Editar Jogo"
    header-bg-variant="dark"
    header-text-variant="light"
    body-bg-variant="light"
    body-text-variant="dark"
    footer-bg-variant="light"
  >
    <b-container fluid>
      <b-row class="mb-1">
        <b-col>
          <b-form-group class="mb-3" id="modal-group-1" label="Data:" label-for="modal-1">
            <b-form-datepicker required id="modal-1" v-model="matchEdit.date"></b-form-datepicker>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="mb-1">
        <b-col>
          <b-form-group class="mb-3" id="modal-group-2" label="Hora Início:" label-for="modal-2">
            <b-form-timepicker id="modal-2" v-model="matchEdit.beginTime"></b-form-timepicker>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group class="mb-3" id="modal-group-3" label="Hora Fim:" label-for="modal-3">
            <b-form-timepicker id="modal-3" v-model="matchEdit.endTime"></b-form-timepicker>
          </b-form-group>
        </b-col>
      </b-row>
      <br />
      <br />
    </b-container>

    <template v-slot:modal-footer>
      <div class="w-100">
        <span
          v-b-tooltip.top
          title="Só é possível remover o jogo após a remoção dos golos do mesmo!"
        >
          <b-btn
            class="ml-3"
            :disabled="hasGoals"
            @click="deleteMatch"
            variant="outline-primary"
            size="sm"
            squared
          >Apagar Jogo</b-btn>
        </span>
        <b-btn
          variant="outline-primary"
          size="sm"
          class="float-right mr-3"
          @click="editionMatch"
        >Gravar</b-btn>
        <b-btn
          variant="outline-primary"
          size="sm"
          class="float-right mr-2"
          @click="modal.showMatch=false"
        >Fechar</b-btn>
      </div>
    </template>
  </b-modal>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

import moment from 'moment'
import lodash from 'lodash'
import Noty from 'noty'

export default {
  name: 'modalEditMatch',
  data() {
    return {
      urlTimeDisabled: true
    }
  },
  computed: {
    ...mapState(['modal']),
    ...mapState('matches', ['match', 'matchEdit']),
    ...mapGetters(['canEdit']),
    ...mapGetters('matches', ['hasMatches']),
    ...mapGetters('goals', ['hasGoals'])
  },
  methods: {
    ...mapActions('matches', ['editMatch', 'delMatch']),
    async editionMatch() {
      await this.editMatch()
      this.$noty.info('Jogo Actualizado!')
      this.modal.showMatch = false
    },
    async deleteMatch() {
      let n = new Noty({
        text: 'Tens a certeza que queres apagar este jogo?',
        theme: 'metroui',
        type: 'error',
        layout: 'center',
        modal: true,
        buttons: [
          Noty.button('Sim', 'btn btn-outline-light btn-sm', async () => {
            await this.delMatch(this.match)
            this.$router.push({ name: 'index' })
            this.$noty.warning('Jogo Removido!')
            n.close()
          }),
          Noty.button('Não', 'btn btn-outline-light btn-sm ml-1', () => {
            n.close()
          })
        ]
      }).show()
    }
  }
}
</script>

<style scoped>
</style>
