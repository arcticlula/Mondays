<template>
  <div class="content-page py-0">
    <b-col
      cols="12"
      md="12"
      lg="9"
      xl="8"
      class="mt-2 playerProfile py-0 px-1"
      style="display: inline-block;"
    >
      <b-row>
        <b-col cols="12">
          <b-card no-body style="height: 100%;">
            <div class="card-header">
              <b-col cols="12">
                <div class="row">
                  <b-col cols="12" class="px-0">Administrador</b-col>
                </div>
              </b-col>
            </div>
            <b-card-body>
              <b-row>
                <user-props v-for="user in users" :user="user" :key="user.id"></user-props>
              </b-row>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-col>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import userProps from '../components/admin/userProps'

export default {
	name: 'config',
	layout: 'home',
	computed: {
		...mapState('users', ['users'])
	},
	components: {
		userProps
	},
	methods: {
		// ...mapActions(['signOut'])
	},
	async fetch({ store }) {
		try {
			await store.dispatch('users/getUsers')
		} catch (e) {
			console.error(e)
		}
	}
}
</script>

<style scoped>
</style>
