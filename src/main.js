// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuerify from 'vuerify'
import VuerifyNext from 'v-vuerify-next'
Vue.config.productionTip = false
Vue.use(Vuerify)
Vue.use(VuerifyNext)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
