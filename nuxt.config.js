import config from "./config"
const path = require('path')
export default {
  mode: 'universal',
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
  plugins: ['~/plugins/vue-moment.js', '~/plugins/bootstrap-vue.js'],

  /*
   ** Nuxt.js modules
   
   */
  modules: ['@nuxtjs/svg',
    'bootstrap-vue/nuxt',
    [
      'nuxt-fire',
      {
        config: config,
        services: {
          firestore: true
        }
      }
    ]
  ],
  bootstrapVue: {
    bootstrapCSS: false, // here you can disable automatic bootstrapCSS in case you are loading it yourself using sass
    bootstrapVueCSS: false, // CSS that is specific to bootstrapVue components can also be disabled. That way you won't load css for modules that you don't use
    componentPlugins: [], // Here you can specify which components you want to load and use
    directivePlugins: [], // Here you can specify which directives you want to load and use. Look into official docs to get a list of what's available
    components: ['BIconPlus', 'BIconDash']
  },
}
