<template>
  <div>
    <b-navbar class="navbarTop fixed-top">
      <a class="d-none d-sm-none d-md-none d-lg-block navbar-brand">
        <img width="35px" src="../assets/icon.png" />
      </a>
      <span class="navbar-toggler-icon rotate-90"></span>
      <b-btn @click="$router.go(-1)" class="btnarrowleft" variant="outline-primary">
        <span class="dl dl-left"></span>
      </b-btn>
      <div class="pl-2" id="navbarText" style="margin: 0 auto;">
        <ul class="navbar-nav"></ul>
      </div>
      <div style="text-align: right;">
        <ul id="navbarUser">
          <b-avatar variant="primary" v-if="userDB.name" :src="userDB.picture"></b-avatar>
          <li class="btn-pages user_name">{{userDB.name}}</li>
          <!-- <li class="btn-pages">
					<b-btn variant="danger" size="sm">
						<b>-20</b>
						<i class="dl dl-money"></i>
					</b-btn>
          </li>-->
          <li class="collapse-dl btn-pages">
            <b-dropdown right variant="outline-secondary" size="sm">
              <span slot="text">
                <i class="dl dl-config"></i>
              </span>
              <b-dropdown-item>
                <router-link to="/config">Configurações</router-link>
              </b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item>
                <router-link to="/">Log out</router-link>
              </b-dropdown-item>
            </b-dropdown>
          </li>
        </ul>
      </div>
    </b-navbar>
    <nuxt />
  </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex'
export default {
	name: 'simpleBack',
	computed: {
		...mapState(['mode']),
		...mapGetters(['userDB']),
		routerPath() {
			return this.$nuxt.$route.name
		}
	}
}
</script>

<style scoped>
</style>
