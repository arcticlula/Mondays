<template>
  <div>
    <b-card v-for="player in players" v-bind:key="player.id">
      <b-card no-body class="overflow-hidden" style="max-width: 540px;">
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img :src="require(`../assets/players/${player.id}.jpg`)" class="rounded-0"></b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body :title="player.name">
              <b-card-text>{{player.nickname}}</b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </b-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'choosePlayer',
  computed: {
    ...mapState(['players'])
  },
  methods: {
    ...mapActions(['getPlayers'])
  },
  async fetch({ store }) {
    try {
      await store.dispatch('getPlayers')
    } catch (e) {
      console.error(e)
    }
  },
  async mounted() {
    try {
      await this.getPlayers()
    } catch (e) {
      console.error(e)
    }
    console.log(this.players)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
