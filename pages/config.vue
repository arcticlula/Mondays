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
          <b-card border-variant="primary" no-body style="height: 100%;">
            <div class="card-header bg-white">
              <b-col cols="12">
                <div class="row">
                  <b-col cols="12" class="px-0">Configurações</b-col>
                </div>
              </b-col>
            </div>
            <b-card-body>
              <b-row>
                <b-col cols="12">
                  <b-form-group class="mb-3" id="input-group-0" label="Modo:" label-for="input-0">
                    <b-form-checkbox
                      style="display: inline-flex;"
                      id="input-0"
                      v-model="nightModeVar"
                      switch
                    ></b-form-checkbox>
                    <span
                      v-if="nightModeVar"
                      style="vertical-align: super; display: inline-flex;"
                      class="dl dl-moon"
                    ></span>
                    <span v-else style="vertical-align: super;" class="dl dl-sun"></span>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12">
                  <b-form-group class="mb-3" id="input-group-1" label="Admin:" label-for="input-1">
                    <b-form-checkbox
                      id="input-1"
                      :disabled="admin==0"
                      v-model="mode.edition"
                      switch
                    ></b-form-checkbox>
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
export default {
	name: 'config',
	layout: 'home',
	computed: {
		...mapState(['mode']),
		...mapGetters(['admin']),
		nightModeVar: {
			get: function() {
				return this.mode.night
			},
			set: function(data) {
				return this.setNightMode(data)
			}
		}
	},
	methods: {
		...mapMutations(['setNightMode']),
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
