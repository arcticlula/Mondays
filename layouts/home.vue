<template>
  <div>
    <nav
      class="navbar navbar-expand-lg bg-white fixed-top"
      v-bind:class="[{ 'navbar-dark':nightMode }, 'navbar-light']"
    >
      <a class="d-none d-sm-none d-md-none d-lg-block navbar-brand">
        <img width="35px" src="../assets/logo_login.png" />
      </a>
      <span class="navbar-toggler-icon rotate-90"></span>
      <div class="pl-2" id="navbarText" style="margin: 0 auto;">
        <ul class="navbar-nav">
          <li class="nav-item mr-2">
            <b-input-group prepend="Mês">
              <b-form-select
                :options="monthArray"
                v-model="navbar.month"
                @input="getMatches()"
                :disabled="monthDisabled"
              />
            </b-input-group>
          </li>
          <li class="nav-item ml-2">
            <b-input-group prepend="Ano">
              <b-form-select :options="yearArray" v-model="navbar.year" @input="getMatches()" />
            </b-input-group>
          </li>
        </ul>
      </div>
      <div style="text-align: right;">
        <ul id="navbarUser">
          <li class="btn-pages user_name">{{user.profile.name}}</li>
          <li class="collapse-dl btn-pages">
            <client-only>
              <b-dropdown right variant="outline-secondary" size="sm">
                <span slot="text">
                  <i class="dl dl-config"></i>
                </span>
                <b-dropdown-item>
                  <nuxt-link to="config">Configurações</nuxt-link>
                </b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item>
                  <nuxt-link to="login">Log out</nuxt-link>
                </b-dropdown-item>
              </b-dropdown>
            </client-only>
          </li>
        </ul>
      </div>
      <client-only>
        <div class="navbar-vertical-dl">
          <nuxt-link to="home">
            <ul v-bind:class="{ active: routerPath == 'home' }">
              <li>
                <a class="nav-link p-none">
                  <span class="dl dl-req"></span>
                  <span class="hidding pl-1">Home</span>
                </a>
              </li>
            </ul>
          </nuxt-link>
          <hr class="hr_menu" />
          <nuxt-link to="/">
            <ul v-bind:class="{ active: routerPath == 'UserProfile' }">
              <li class="nav-item">
                <a class="nav-link p-none">
                  <span class="dl dl-player"></span>
                  <span class="hidding pl-1">Perfil</span>
                </a>
              </li>
            </ul>
          </nuxt-link>
          <hr class="hr_menu" />
          <nuxt-link to="config">
            <ul v-bind:class="{ active: routerPath == 'config' }">
              <li class="nav-item">
                <a class="nav-link p-none">
                  <span class="dl dl-config"></span>
                  <span class="hidding pl-1">Config.</span>
                </a>
              </li>
            </ul>
          </nuxt-link>
          <hr class="hr_menu" />
          <nuxt-link to="login">
            <ul class="logout" v-bind:class="{ active: routerPath == 'login' }">
              <li class="nav-item">
                <a class="nav-link p-none">
                  <span class="dl dl-remove"></span>
                  <span class="hidding pl-1">Logout</span>
                </a>
              </li>
            </ul>
          </nuxt-link>
        </div>
      </client-only>
    </nav>
    <nuxt />
  </div>
</template>


<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import moment from 'moment'
export default {
  name: 'home',
  data() {
    return {
      monthDisabled: false,
      monthArray: [
        { value: '0', text: 'Todos' },
        { value: '9', text: 'Setembro' },
        { value: '10', text: 'Outubro' },
        { value: '11', text: 'Novembro' },
        { value: '12', text: 'Dezembro' },
        { value: '13', text: 'Janeiro' },
        { value: '14', text: 'Fevereiro' },
        { value: '15', text: 'Março' },
        { value: '16', text: 'Abril' },
        { value: '17', text: 'Maio' },
        { value: '18', text: 'Junho' },
        { value: '19', text: 'Julho' },
        { value: '20', text: 'Agosto' }
      ],
      yearArray: []
    }
  },
  computed: {
    ...mapState(['navbar', 'firstYear', 'nightMode']),
    ...mapState('login', ['user']),
    ...mapGetters(['yearHigh', 'yearLow']),
    routerPath() {
      return this.$nuxt.$route.name
    }
  },
  methods: {
    ...mapMutations(['setMonth']),
    ...mapActions('matches', ['getMatchesByDate']),
    async getMatches() {
      if (this.yearHigh == moment().format('YYYY-MM-DD')) {
        this.setMonth()
        this.monthDisabled = true
      } else this.monthDisabled = false
      this.getMatchesByDate()
    }
  },
  beforeMount() {
    console.log(this.user)
    let firstYear = moment(this.firstYear)
    let yearArray = []
    let years = Math.ceil(moment().diff(firstYear, 'years', true)) + 1
    for (let i = years; i > 0; i--) {
      if (i == years) {
        yearArray.push({
          text: 'Todos',
          value: moment().format('YYYY-MM-DD')
        })
      } else {
        let currYear = firstYear.clone().add(i, 'years')
        let lastYear = currYear.clone().subtract(1, 'years')
        // console.log(lastYear.format("YYYY-MM-DD"));
        yearArray.push({
          text: lastYear.format('YYYY') + '/' + currYear.format('YYYY'),
          value: lastYear.format('YYYY-MM-DD')
        })
      }
    }
    this.yearArray = yearArray
  }
}
</script>

<style scoped>
</style>
