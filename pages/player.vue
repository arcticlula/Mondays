<template>
  <div class="content-page py-0">
    <b-col
      cols="12"
      md="12"
      lg="7"
      xl="6"
      class="mt-2 playerProfile py-0 px-1"
      style="display: inline-block;"
    >
      <b-row class="row-eq-height">
        <b-col cols="12" class="py-0">
          <b-card no-body style="height: 100%;">
            <!-- <div class="card-header"> -->
            <!-- <b-col cols="12">
              <div class="row">
                <b-col cols="12" class="px-0">{{playerUser.name}}</b-col>
              </div>
            </b-col>-->
            <!-- </div> -->
            <b-card-body class="px-2 py-1">
              <!-- {{playerUser}} -->
              <b-col cols="12">
                <b-row>
                  <div class="mr-2" style="display: grid;">
                    <span class="playerProfile text-center">
                      <img class="badge-xl" :src="getPic" onerror="this.src='getDefault'" />
                    </span>
                  </div>
                  <div style="display: grid;">
                    <b-row>
                      <b-col cols="12">
                        <b>Nome:</b>
                        {{player.name}}
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b>Alcunha:</b>
                        {{player.nickname}}
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12">
                        <b>Idade:</b>
                        {{age}} ({{dob | moment("DD/MM/YYYY")}})
                      </b-col>
                    </b-row>
                  </div>
                </b-row>
              </b-col>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
      <upload v-if="canEditPlayer" :player="player" />
      <b-row>
        <b-col cols="12" class="mt-2">
          <b-card no-body style="height: 100%;">
            <div class="card-header">
              <b-col cols="12" class="p-0">
                <b-row>
                  <b-col cols="4">
                    <label>Jogo</label>
                  </b-col>
                  <b-col cols="4" class="text-center">
                    <label
                      class="d-none d-sm-inline d-md-inline d-lg-inline d-xl-inline"
                    >Golos &amp; Assistências</label>
                    <label class="d-inline d-sm-none d-md-none d-lg-none d-xl-none">
                      <i class="dl dl-bola"></i> &amp;
                      <i class="dl dl-ass"></i>
                    </label>
                  </b-col>
                  <b-col cols="4" class="text-right">
                    <label>Resultado</label>
                  </b-col>
                </b-row>
              </b-col>
            </div>
            <b-card-body class="p-2">
              <match-stats
                v-on:click.native="openMatch(match.id)"
                v-for="match in matchesFiltered"
                :match="match"
                :key="match.id"
              ></match-stats>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-col>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import matchStats from '../components/player/matchStats'
import upload from '../components/upload'
import moment from 'moment'
import { isEmpty } from 'lodash'
// import chartHeatmap from "./chartHeatmap.vue";

export default {
  name: 'player',
  layout: 'home',
  components: {
    matchStats,
    upload
  },
  computed: {
    ...mapState('matches', ['matches']),
    ...mapState('players', ['player']),
    ...mapGetters(['canEditPlayer']),
    ...mapGetters('players', ['dob']),
    age() {
      return moment().diff(this.dob, 'years', false) + ' anos'
    },
    matchesFiltered() {
      return !isEmpty(this.matches) && !isEmpty(this.player)
        ? this.matches.filter((s) => s.players[this.player.id])
        : []
    },
    routerPath() {
      return this.$nuxt.$route.name
    },
    routerQuery() {
      return this.$nuxt.$route.query
    },
    getPic() {
      return this.player.picture ? this.player.picture : this.getDefault
    },
    getDefault() {
      return require(`@/assets/players/playernull.jpg`)
    }
  },
  methods: {
    openMatch(id) {
      console.log(id)
      this.$router.push({ name: 'match', query: { match: id } })
    }
  },
  async fetch({ store, route }) {
    try {
      await store.dispatch('players/getPlayerById', route.query.player)
      // console.log(store.state)
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<style scoped>
</style>
