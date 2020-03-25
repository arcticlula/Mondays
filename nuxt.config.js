import config from "./config"
const path = require('path')
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
    bodyAttrs: {
      class: 'enlarged'
    }
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
  plugins: ['~/plugins/vue-moment.js', '~/plugins/firebase.js', { src: '~/plugins/localStorage.js', ssr: false }],

  /*
   ** Nuxt.js modules
   
   */
  modules: ['@nuxtjs/svg',
    'bootstrap-vue/nuxt'
  ]
}
