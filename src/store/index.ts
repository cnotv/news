import Vue from "vue";
import Vuex from "vuex";

import * as actions from "./actions";
import * as getters from "./getters";
import mutations from "./mutations";
import * as state from "./state";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default new Vuex.Store({
  state: state.default,
  mutations,
  actions,
  getters,
  modules: {},
  plugins: [vuexLocal.plugin]
});
