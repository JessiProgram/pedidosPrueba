import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import usuarios from './modules/usuarios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: false
  },
  mutations: {
    setDrawer (state, drawer) {
      state.drawer = drawer
    }
  },
  actions: {
  },
  getters: {
    getDrawer ( state ) {
      return state.drawer
    }
  },
  plugins: [
    createPersistedState()
  ],
  modules: {
    usuarios,
  }
})