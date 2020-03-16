<template>
  <b-col cols="12">
    <b-row>
      <b-col cols="12">
        <b-table
          striped
          hover
          :items="marcadoresJogo"
          :fields="fields"
          @row-clicked="goToProfile"
          ref="table"
        ></b-table>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'highscore',
  data() {
    return {
      marcadoresJogo: null,
      fields: [
        {
          key: 'nome',
          label: 'Nome',
          sortable: true
        },
        {
          key: 'golos',
          label: 'G',
          sortDirection: 'desc',
          sortable: true
        },
        {
          key: 'assistencias',
          label: 'A',
          sortDirection: 'desc',
          sortable: true
        }
      ]
    }
  },
  computed: {},
  methods: {
    goToProfile(row) {
      // console.log(row);
      // console.log(row.idJogador);
      this.$router.push({
        name: 'Profile',
        query: { id: row.idJogador }
      })
    }
  }
}
</script>

<style scoped>
</style>
