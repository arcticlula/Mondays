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
        <i v-if="canEdit" @click="editGoal" class="dl dl-pencil"></i>
        <i v-else-if="hasUrl" @click="openVideo" class="dl dl-bell"></i>
      </b-col>
    </b-row>
    <b-row v-else class="my-1">
      <b-col cols="12" class="text-right">
        <i v-if="canEdit" @click="editGoal" class="dl dl-pencil"></i>
        <i v-else-if="hasUrl" @click="openVideo" class="dl dl-bell"></i>
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
        <i v-if="canEdit" @click="editGoal" class="dl dl-pencil"></i>
        <i v-else-if="hasUrl" @click="openVideo" class="dl dl-bell"></i>
      </b-col>
    </b-row>
    <b-row v-else class="my-1">
      <b-col cols="12" class="text-right">
        <i v-if="canEdit" @click="editGoal" class="dl dl-pencil"></i>
        <i v-else-if="hasUrl" @click="openVideo" class="dl dl-bell"></i>
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
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import moment from 'moment'
import lodash from 'lodash'
import Noty from 'noty'

export default {
	name: 'matchGoals',
	props: { goal: Object },
	computed: {
		...mapState(['modal']),
		...mapGetters(['canEdit']),
		getNameGoal() {
			return !_.isEmpty(this.goal.players)
				? this.goal.players.goal.nickname
				: ''
		},
		getNameAssist() {
			return !_.isEmpty(this.goal.players.assist)
				? this.goal.players.assist.nickname
				: ''
		},
		hasUrl() {
			return _.isEmpty(this.goal.url) ? false : true
		}
	},
	methods: {
		...mapMutations('goals', ['setGoal']),
		...mapActions('goals', ['setTimeMin']),
		openVideo() {
			window.open(this.goal.url.link, '_blank')
		},
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
