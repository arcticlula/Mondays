<template>
  <div id="login" class="content-page">
    <div class="container">
      <div class="row">
        <div class="col-12 px-4">
          <div class="card py-3 px-4">
            <div class="row">
              <div class="col-12 mt-1 mb-4 text-center">
                <img src="../assets/logo_login.png" />
              </div>
            </div>
            <div class="row">
              <div class="col-12 text-center">
                <b-btn @click="googleSignIn" squared variant="outline-primary">Login</b-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	name: 'login',
	methods: {
		...mapActions(['googleSignIn'])
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
