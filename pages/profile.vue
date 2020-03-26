<template>
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
        <b-card border-variant="primary" no-body style="height: 100%;">
          <div class="card-header bg-white">
            <b-col cols="12">
              <div class="row">
                <b-col cols="12" class="px-0">{{activeUser.displayName}}</b-col>
              </div>
            </b-col>
          </div>
          <b-card-body class="px-2 py-1">
            <b-col cols="12">
              <b-row>
                <b-col cols="3" sm="2" class="px-0">
                  <span class="playerProfile text-center">
                    <img :src="url" />
                  </span>
                </b-col>
                <b-col cols="9" sm="10">
                  <b-row>
                    <b-col cols="12">
                      <b>Nome:</b>
                      {{activeUser.displayName}}
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12">
                      <b>Idade:</b>
                      {{idade}}
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12">
                      <span
                        class="d-none d-sm-none d-md-inline d-lg-inline d-xl-inline font-weight-bold"
                      >Data Nascimento:</span>
                      <span
                        class="d-inline d-sm-inline d-md-none d-lg-none d-xl-none font-weight-bold"
                      >Nasc.:</span>
                      {{activeUser.dob | moment("DD/MM/YYYY")}}
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>
          </b-card-body>
        </b-card>
      </b-col>
      <!-- <b-col cols="3" sm="3" md="2" lg="4" xl="2" class="pl-1">
				<b-card
					border-variant="primary"
					header="Posição"
					header-bg-variant="primary"
					header-text-variant="white"
					align="center"
				>
					<b-card-body class="classificacao my-auto">
						<label>#8</label>
					</b-card-body>
				</b-card>
      </b-col>-->
    </b-row>
    <b-row>
      <b-col cols="12" class="mt-2">
        <b-card border-variant="primary" no-body style="height: 100%;">
          <div class="card-header bg-white">
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
            <b-col
              v-for="jogo in jogadorInfo"
              v-bind:jogo="jogo"
              v-bind:key="jogo.data"
              cols="12"
              class="p-0"
            >
              <b-row class="mb-1">
                <b-col cols="4" class="pr-0">
                  <label>{{jogo.data | moment("DD/MM/YYYY")}}</label>
                </b-col>
                <b-col cols="4" class="text-center p-0">
                  <i class="dl dl-bola"></i>
                  <label class="pr-1">{{jogo.golos}}</label>
                  <i class="dl dl-ass"></i>
                  <label>{{jogo.assistencias}}</label>
                </b-col>
                <b-col cols="4" class="text-right pl-0">
                  <label class="pr-2">{{jogo.golosCasa}}-{{jogo.golosVisitante}}</label>
                  <label
                    v-if="(jogo.resultadoCasa==='V' && jogo.casa==1) || (jogo.resultadoCasa==='D' && jogo.casa==0)"
                    class="vitoria"
                  ></label>
                  <label
                    v-else-if="(jogo.resultadoCasa==='V' && jogo.casa==0) || (jogo.resultadoCasa==='D' && jogo.casa==1)"
                    class="derrota"
                  ></label>
                  <label v-else class="empate"></label>
                </b-col>
              </b-row>
            </b-col>
          </b-card-body>
        </b-card>
      </b-col>
      <!-- <b-col cols="12" class="mt-2">
				<b-card border-variant="primary" no-body style="height: 100%;">
					<div class="card-header bg-white">
						<heatmap />
					</div>
				</b-card>
      </b-col>-->
    </b-row>
  </b-col>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import moment from 'moment'
// import chartHeatmap from "./chartHeatmap.vue";

export default {
	name: 'profile',
	// components: {
	// 	heatmap: chartHeatmap
	// },
	data() {
		return {
			url: require('../assets/player' + this.user.idJogador + '.jpg')
		}
	},
	computed: {
		...mapState('player', ['player']),
		...mapGetters('activeUser'),
		idade() {
			// return moment(this.user.dataNasc).fromNow(true);
			// return moment().diff(this.user.dataNasc, "years", false) + " anos";
			return 2
		}
	}
}
</script>

<style scoped>
</style>
