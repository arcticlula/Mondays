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
          <b-card border-variant="primary" no-body style="height: 100%;">
            <div class="card-header bg-white">
              <b-col cols="12">
                <div class="row">
                  <b-col cols="12" class="px-0">Configurações</b-col>
                </div>
              </b-col>
            </div>
            <b-card-body class="px-2 py-1">
              <b-col cols="12">
                <b-row>
                  <b-col cols="12" class="px-0">Modo</b-col>
                </b-row>
                <b-row>
                  <b-col cols="12" class="px-0">
                    <span class="dl dl-sun"></span>
                    <label class="switch">
                      <input type="checkbox" v-model="nightModeVar" />
                      <span class="slider round"></span>
                    </label>
                    <span class="dl dl-moon"></span>
                  </b-col>
                </b-row>
              </b-col>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-col>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { mapFields } from 'vuex-map-fields'
export default {
	name: 'config',
	layout: 'home',
	computed: {
		...mapState(['nightMode']),
		nightModeVar: {
			get: function() {
				return this.nightMode
			},
			set: function(data) {
				return this.setNightMode(data)
			}
		}
	},
	methods: {
		...mapMutations(['setNightMode'])
	}
}
</script>

<style scoped>
</style>
