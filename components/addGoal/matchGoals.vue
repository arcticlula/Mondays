<template>
  <div v-if="!goal.isOwnGoal">
    <b-row v-if="goal.local=='home'" class="my-1">
      <b-col cols="12">
        <label class="pr-1">{{goal.timeMin}}</label>
        <i v-if="!goal.isPenaltyFailed" class="dl dl-bola"></i>
        <i v-else class="dl dl-warning text-red"></i>
        <label class="pr-1">
          <b>{{getNameGoal}}</b>
        </label>
        <label v-if="!!goal.assist">({{getNameAssist}})</label>
        <label v-else-if="goal.isPenalty">(Penalidade)</label>
        <label v-else-if="goal.isPenaltyFailed">(Pen. Falhado)</label>
        <span @click="deleteGoal">x</span>
      </b-col>
    </b-row>
    <b-row v-else class="my-1">
      <b-col cols="12" class="text-right">
        <span @click="deleteGoal">x</span>
        <label v-if="!!goal.assist" class="pr-1">({{getNameAssist}})</label>
        <label v-else-if="goal.isPenalty">(Penalidade)</label>
        <label v-else-if="goal.isPenaltyFailed">(Pen. Falhado)</label>
        <label class="pr-1">
          <b>{{getNameGoal}}</b>
        </label>
        <i v-if="!goal.isPenaltyFailed" class="dl dl-bola"></i>
        <i v-else class="dl dl-bola text-red"></i>
        <label class="pl-1">{{goal.timeMin}}</label>
      </b-col>
    </b-row>
  </div>
  <div v-else>
    <b-row v-if="goal.local=='home'" class="my-1">
      <b-col cols="12">
        <label class="pr-1">{{goal.timeMin}}</label>
        <i class="dl dl-bola text-red"></i>
        <label class="pr-1">
          <b>{{getNameGoal}}</b>
        </label>
        <label>(Auto-Golo)</label>
        <span @click="deleteGoal">x</span>
      </b-col>
    </b-row>
    <b-row v-else class="my-1">
      <b-col cols="12" class="text-right">
        <span @click="deleteGoal">x</span>
        <label class="pr-1">(Auto-Golo)</label>
        <label class="pr-1">
          <b>{{getNameGoal}}</b>
        </label>
        <i class="dl dl-bola text-red"></i>
        <label class="pl-1">{{goal.timeMin}}</label>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import lodash from 'lodash'
import Noty from 'noty'

export default {
  name: 'matchGoals',
  props: { goal: Object },
  computed: {
    getNameGoal() {
      return !_.isEmpty(this.goal.players)
        ? this.goal.players.goal.nickname
        : ''
    },
    getNameAssist() {
      return !_.isEmpty(this.goal.players.assist)
        ? this.goal.players.assist.nickname
        : ''
    }
  },
  methods: {
    ...mapActions('goals', ['delGoal']),
    async deleteGoal() {
      let n = new Noty({
        text: 'Tens a certeza que queres apagar este golo?',
        theme: 'metroui',
        type: 'error',
        layout: 'center',
        modal: true,
        buttons: [
          Noty.button('Sim', 'btn btn-outline-light btn-sm', async () => {
            await this.delGoal(this.goal)
            this.$noty.warning('Golo Removido!')
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
