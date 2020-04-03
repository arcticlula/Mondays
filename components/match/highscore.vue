<template>
  <b-col cols="12">
    <b-row>
      <b-col cols="12">
        <b-table
          striped
          hover
          :items="highscoreMatch"
          :fields="fields"
          @row-clicked="goToProfile"
          ref="table"
        ></b-table>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
	name: 'highscore',
	data() {
		return {
			fields: [
				{
					key: 'name',
					label: 'Nome',
					sortable: true
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
			]
		}
	},
	computed: {
		...mapGetters('matches', ['highscoreMatch'])
	},
	methods: {
		goToProfile(row) {
			// console.log(row);
			// console.log(row.idJogador);
			this.$router.push({
				name: 'profile',
				query: { id: row.idJogador }
			})
		}
	}
}
</script>

<style scoped>
</style>
