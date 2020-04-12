<template>
  <b-col cols="12" md="6" lg="6" xl="6" class="mt-2 py-0 px-1" style="display: inline-block;">
    <b-row class="row-eq-height">
      <b-col cols="12">
        <b-card border-variant="primary" no-body style="height: 100%;">
          <div class="card-header bg-white">
            <b-col cols="12">
              <div class="row">
                <b-col cols="12" class="p-0">Classificação Geral</b-col>
              </div>
            </b-col>
          </div>
          <b-card-body class="p-2">
            <b-row>
              <b-col cols="12">
                <b-table
                  striped
                  hover
                  :items="highscorePlayed"
                  :fields="fields"
                  @row-clicked="goToProfile"
                  ref="table"
                >
                  <!-- <template slot="actions" slot-scope="row">
										<b-button
											size="sm"
											@click="row.toggleDetails"
										>{{ row.detailsShowing ? 'Hide' : 'Show' }} Details</b-button>
                  </template>-->
                  <!-- <template slot="row-details" slot-scope="row">
										<b-card>
											<b-row class="mb-2">
												<b-col sm="3" class="text-sm-left">
													<b>Golos p/ jogo:</b>
												</b-col>
												<b-col>{{ row.item.golos/row.item.jogos }}</b-col>
											</b-row>
											<b-row class="mb-2">
												<b-col sm="3" class="text-sm-left">
													<b>Assists p/ jogo:</b>
												</b-col>
												<b-col>{{ row.item.assistencias/row.item.jogos }}</b-col>
											</b-row>
										</b-card>
                  </template>-->
                </b-table>
              </b-col>
            </b-row>
            <!-- <hr>
						<b-row>
							<b-col cols="12">
								<b-badge variant="secondary">Descrição:</b-badge>&nbsp;04:00 - Golo Reininho - Assistência Lula
							</b-col>
						</b-row>
						<b-row>
							<b-col cols="12" class="text-right">
								<b-badge variant="success">20€</b-badge>
								<b-badge variant="danger">Youtube</b-badge>
							</b-col>
            </b-row>-->
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'highscore',
  data() {
    return {
      fields: [
        // {
        //   key: 'row',
        //   label: '#',
        //   sortable: true
        // },
        {
          key: 'name',
          label: 'Nome',
          sortable: true
        },
        {
          key: 'matches',
          label: 'Jogos',
          sortDirection: 'desc',
          sortable: true
        },
        {
          key: 'wins',
          label: 'V',
          sortable: true,
          sortDirection: 'desc'
          // variant: "success"
        },
        {
          key: 'draws',
          label: 'E',
          sortable: true,
          sortDirection: 'desc'
          // variant: "warning"
        },
        {
          key: 'losses',
          label: 'D',
          sortable: true,
          sortDirection: 'desc'
          // variant: "danger"
        },
        {
          key: 'goals',
          label: 'G',
          sortDirection: 'desc',
          sortable: true
        },
        {
          key: 'assists',
          label: 'A',
          sortDirection: 'desc',
          sortable: true
        }
        // { key: "actions", label: "Actions" }
      ]
    }
  },
  methods: {
    goToProfile(row) {
      this.$router.push({
        name: 'player',
        query: { player: row.id }
      })
    }
  },
  computed: {
    ...mapState('players', ['players']),
    ...mapGetters('matches', ['highscorePlayed'])
  }
}
</script>

<style scoped>
</style>
