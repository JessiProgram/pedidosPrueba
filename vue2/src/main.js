import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './plugins/firebase'
import vuetify from './plugins/vuetify'
import './plugins/axios'
import './plugins/router-middleware'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App),
  created() {
    this.$store.watch(myStore => {
      if (!myStore.usuarios.usuario && this.$route.fullPath !== '/autenticacion/inicio-sesion') {
        this.$router.push('/autenticacion/inicio-sesion')
      }
    })
  }
}).$mount('#app')