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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['./styles/segundas.css', './styles/DL_Icons.css'],
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
    '@nuxtjs/pwa',
    '@nuxtjs/svg',
    'bootstrap-vue/nuxt',
    '@nuxtjs/dotenv',
  ],
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
