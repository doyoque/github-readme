import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMarkdown from 'vue-markdown'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Loader from './views/_loader.vue'

Vue.config.productionTip = false
Vue.component('vue-markdown', VueMarkdown)
Vue.component('loader', Loader)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
