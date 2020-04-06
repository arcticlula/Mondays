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
                  <b-col cols="12" class="px-0 py-2">
                    <b-form-group
                      class="mb-3 mx-3"
                      id="input-group-0"
                      label="Modo:"
                      label-for="input-0"
                    >
                      <b-row cols="12">
                        <b-form-checkbox id="input-0" v-model="nightModeVar" switch></b-form-checkbox>
                        <span v-if="nightModeVar" style="align-self: center;" class="dl dl-moon"></span>
                        <span v-else style="align-self: center;" class="dl dl-sun"></span>
                      </b-row>
                    </b-form-group>
                  </b-col>
                  <b-col cols="12" class="px-0 py-2">
                    <b-form-group
                      class="mb-3 mx-3"
                      id="input-group-1"
                      label="Admin:"
                      label-for="input-1"
                    >
                      <b-row cols="12">
                        <b-form-checkbox
                          id="input-1"
                          :disabled="admin==0"
                          v-model="mode.edition"
                          switch
                        ></b-form-checkbox>
                      </b-row>
                    </b-form-group>
                  </b-col>
                  <b-col cols="12" class="px-0 py-2">
                    <b-btn size="sm" squared variant="outline-primary" @click="signOut">Sign Out</b-btn>
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
	}
}
</script>

<style scoped>
</style>
