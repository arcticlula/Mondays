<template>
  <div>
    <nav
      class="navbar navbar-expand-lg bg-white fixed-top"
      v-bind:class="[{ 'navbar-dark':nightMode }, 'navbar-light']"
    >
      <a class="d-none d-sm-none d-md-none d-lg-block navbar-brand">
        <img width="35px" src="../assets/logo_login.png" />
      </a>
      <span @click="rotate" class="navbar-toggler-icon rotate-90"></span>
      <div class="pl-2" id="navbarText" style="margin: 0 auto;">
        <ul class="navbar-nav"></ul>
      </div>
      <div style="text-align: right;">
        <ul id="navbarUser">
          <li class="btn-pages user_name">{{user}}</li>
          <!-- <li class="btn-pages">
					<b-button variant="danger" size="sm">
						<b>-20</b>
						<i class="dl dl-money"></i>
					</b-button>
          </li>-->
          <client-only>
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
          </client-only>
        </ul>
      </div>
    </nav>
    <nuxt />
  </div>
</template>


<script>
import { mapState } from 'vuex'
export default {
	name: 'simple',
	computed: {
		...mapState(['user', 'nightMode']),
		routerPath() {
			return this.$nuxt.$route.name
		}
	},
	methods: {
		rotate() {
			document.body.classList.toggle('enlarged')
			document
				.querySelector('.navbar-toggler-icon')
				.classList.toggle('rotate-90')
		}
	}
}
</script>

<style scoped>
</style>
