<template>
  <b-col cols="12" class="px-3 pb-1">
    <b-card
      border-variant="primary"
      text-variant="dark"
      class="px-3 clicker w-100"
      style="display: inline-block;"
    >
      <!-- <b-row>

        <b-container>
          <b-row>
            <b-col>
              <b>Nome:</b>
              {{user.name}}
            </b-col>
            <b-col>
              <b>É visitante?:</b>
              <b-form-select
                :options="[{'value':true,'text':'Sim'},{'value':false,'text':'Não'}]"
                v-model="user.isVisitor"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b>Email:</b>
              {{user.email}}
            </b-col>
            <b-col>
              <b>Jogador:</b>
              {{name}}
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b>Criado em:</b>
              {{dateCreated}}
            </b-col>
            <b-col>
              <b>Alterado em:</b>
              {{dateModified}}
            </b-col>
          </b-row>
        </b-container>
      </b-row>-->
      <b-container fluid>
        <b-row>
          <b-col cols="2">
            <div class="mr-2">
              <span>
                <img class="badge-xl" :src="user.picture" />
              </span>
            </div>
          </b-col>
          <b-col cols="10">
            <!-- <b-row>
              <b-col>
                <b>Nome:</b>
                {{user.name}}
              </b-col>
              <b-col inline>
                <b>É visitante?:</b>
                <b-form-select
                  :options="[{'value':true,'text':'Sim'},{'value':false,'text':'Não'}]"
                  v-model="user.isVisitor"
                />
              </b-col>
              <b-col>3 of 3</b-col>
            </b-row>
            <b-row>
              <b-col>
                <b>Email:</b>
                {{user.email}}
              </b-col>
              <b-col>2 of 3</b-col>
              <b-col>3 of 3</b-col>
            </b-row>
            <b-row>
              <b-col>1 of 3</b-col>
              <b-col>2 of 3</b-col>
              <b-col>3 of 3</b-col>
            </b-row>-->
            <b-form inline>
              <b-row>
                <label>Nome:</label>
                <b-input :value="user.name" class="mb-2 mr-sm-2 mb-sm-0"></b-input>
                <label>Email:</label>
                <b-input :value="user.email" class="mb-2 mr-sm-2 mb-sm-0"></b-input>
                <label>Permissões:</label>
                <b-form-select
                  class="mb-2 mr-sm-2 mb-sm-0"
                  :options="[{'value':0,'text':'Nenhuma'},{'value':1,'text':'Escrita'},{'value':2,'text':'Escrita/Edição'}]"
                  v-model="user.admin"
                />
              </b-row>
              <b-row>
                <label>É visitante?</label>
                <b-form-select
                  class="mb-2 mr-sm-2 mb-sm-0"
                  :options="[{'value':true,'text':'Sim'},{'value':false,'text':'Não'}]"
                  v-model="user.isVisitor"
                />
                <label>Jogador:</label>
                <b-form-select
                  class="mb-2 mr-sm-2 mb-sm-0"
                  :options="[{'value':true,'text':'Sim'},{'value':false,'text':'Não'}]"
                  :value="name"
                  v-model="user.player"
                />
                <!-- <b-form-checkbox v-model="user.isVisiting" class="mb-2 mr-sm-2 mb-sm-0">É visitante</b-form-checkbox> -->
              </b-row>
              <!-- <b-row>
                <label>Criado em:</label>
                <b-input :value="dateCreated" class="mb-2 mr-sm-2 mb-sm-0"></b-input>
                <label>Alterado em:</label>
                <b-input :value="dateModified" class="mb-2 mr-sm-2 mb-sm-0"></b-input>
              </b-row>-->
            </b-form>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </b-col>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import { isEmpty } from 'lodash'

export default {
  name: 'user',
  props: { user: Object },
  methods: {},
  computed: {
    dateCreated() {
      return moment(
        this.user.props.dateCreated
          .toDate()
          .toLocaleString('pt-PT', { timeZone: 'UTC' }),
        'DD/MM/YYYY, HH:mm:ss'
      ).format('YYYY/MM/DD HH:mm:ss')
    },
    dateModified() {
      return moment(
        this.user.props.dateModified
          .toDate()
          .toLocaleString('pt-PT', { timeZone: 'UTC' }),
        'DD/MM/YYYY, HH:mm:ss'
      ).format('YYYY/MM/DD HH:mm:ss')
    },
    name() {
      return !isEmpty(this.user.player) ? this.user.player.name : ''
    }
  }
}
</script>

<style scoped>
</style>
