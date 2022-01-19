import Vue from 'vue'
import { createStore, Plugin } from 'vuex'

import { actions } from './actions'
import * as getters from './getters'
import mutations from './mutations'
import { state } from './state'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
})

export const store = createStore({
  state,
  mutations,
  actions,
  getters,
  modules: {},
  plugins: [vuexLocal.plugin] as Plugin<State>[],
})
