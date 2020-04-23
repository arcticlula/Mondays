export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon-01.png' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['./assets/mondays.scss', './assets/DL_Icons.css',],
  /*
   ** Plugins to load before mounting the App
   */

  router: {
    middleware: 'router-auth'
  },
  plugins: ['~/plugins/vue-moment.js', "~/plugins/noty.js", '~/plugins/fireauth.js', { src: '~/plugins/localStorage.js', ssr: false }],

  /*
   ** Nuxt.js modules
   
   */
  modules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/pwa',
    '@nuxtjs/svg',
    '@nuxtjs/dotenv',
    'bootstrap-vue/nuxt'
  ],
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false // Or `bvCSS: false`
  },
  dotenv: {
    filename: '.env.' + process.env.NODE_ENV
  },
  pwa: {
    manifest: {
      "name": "Segundas",
      "display": "fullscreen",
      "orientation": "portrait",
      "scope": "/",
      "start_url": "/"
    }
  }
}
