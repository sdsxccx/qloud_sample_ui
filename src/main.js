import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import '@/styles/element-ui/theme_CF1322/index.css'
import '@/styles/element-ui/theme_43A3FB/index.css'
import '@/styles/index.scss' // global css
import '@/styles/common.scss'

import i18n from './lang' // internationalization

import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission' // permission control
import '@/components/index.js'
import $handleAlert from '@/utils/alert.js'
$handleAlert(Vue)
import $handleDeleteConfirm from '@/utils/confirm'
import VueSocketIO from 'vue-socket.io'
Vue.use(new VueSocketIO({
    debug: true,
    connection: '127.0.0.1:8080', 
}))

$handleDeleteConfirm(Vue)
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

Vue.use(ElementUI, {
  size: 'small', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

const vue = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})

export default vue
