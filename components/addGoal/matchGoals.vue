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
        <i v-if="hasUrl" class="dl dl-bell"></i>
        <i @click="editGoal" class="dl dl-pencil"></i>
      </b-col>
    </b-row>
    <b-row v-else class="my-1">
      <b-col cols="12" class="text-right">
        <i @click="editGoal" class="dl dl-pencil"></i>
        <i v-if="hasUrl" class="dl dl-bell"></i>
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
        <i v-if="hasUrl" class="dl dl-bell"></i>
        <i @click="editGoal" class="dl dl-pencil"></i>
      </b-col>
    </b-row>
    <b-row v-else class="my-1">
      <b-col cols="12" class="text-right">
        <i @click="editGoal" class="dl dl-pencil"></i>
        <i v-if="hasUrl" class="dl dl-bell"></i>
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
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import moment from 'moment'
import { isEmpty } from 'lodash'
import Noty from 'noty'

export default {
  name: 'matchGoals',
  props: { goal: Object },
  computed: {
    ...mapState(['modal']),
    getNameGoal() {
      return !isEmpty(this.goal.players) ? this.goal.players.goal.nickname : ''
    },
    getNameAssist() {
      return !isEmpty(this.goal.players.assist)
        ? this.goal.players.assist.nickname
        : ''
    },
    hasUrl() {
      return isEmpty(this.goal.url)
        ? false
        : isEmpty(this.goal.url.link)
        ? false
        : true
    }
  },
  methods: {
    ...mapMutations('goals', ['setGoal']),
    ...mapActions('goals', ['setTimeMin']),
    editGoal() {
      this.setGoal(this.goal)
      this.setTimeMin()
      this.modal.showGoal = true
    }
  }
}
</script>

<style scoped>
</style>
