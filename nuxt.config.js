export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Todo App',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel:'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '../assets/sass/vendor.scss',
    '../assets/sass/app.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/style-resources'
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)


  // uncomment for cordova generate path static files, command: nuxt generate
  // build: {
  //   publicPath: '/nuxt/'
  // },
  // router: {
  //   base: './',
  //   mode: 'hash'
  // },

  styleResources: {
    scss: ['../assets/sass/_variables.scss']
  },


}
