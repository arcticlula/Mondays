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
      <b-row>
        <b-col cols="12">
          <b-card no-body style="height: 100%;" header="Configurações">
            <!-- <div class="card-header">
              <b-col cols="12">
                <div class="row">
                  <b-col cols="12" class="px-0"></b-col>
                </div>
              </b-col>
            </div>-->
            <b-card-body>
              <b-row>
                <b-col cols="12">
                  <ColorModePicker />
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" v-if="admin">
                  <b-form-group class="mb-3" id="input-group-1" label="Admin:" label-for="input-1">
                    <b-form-checkbox id="input-1" v-model="mode.edition" switch></b-form-checkbox>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12">
                  <b-form-group
                    class="my-2"
                    label="Mostrar apenas jogos jogados:"
                    label-for="input-2"
                  >
                    <b-form-checkbox id="input-2" v-model="mode.playedMatchesOnly" switch></b-form-checkbox>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" class="text-right">
                  <b-btn size="sm" variant="outline-primary" @click="signOut">Sign Out</b-btn>
                </b-col>
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
import ColorModePicker from '@/components/config/ColorModePicker'
export default {
	name: 'config',
	layout: 'home',
	components: {
		ColorModePicker
	},
	computed: {
		...mapState(['mode']),
		...mapGetters(['admin'])
	},
	methods: {
		...mapActions(['signOut'])
	},
	async fetch({ store }) {
		try {
			await store.dispatch('checkUser')
		} catch (e) {
			console.error(e)
		}
	}
}
</script>

<style scoped>
</style>
