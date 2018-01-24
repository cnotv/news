import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const store = () => {
  return new Vuex.Store({
    state: {
      strict: process.env.NODE_ENV !== 'production',
      posts: null,
      subreddit: {},
      subreddits: [],
      currentSub: 'worldnews',
      limits: ['12', '24', '48', '96'],
      currentLimit: '24',
      currentOrder: 'new',
      order: ['hot', 'new', 'rising', 'controversial', 'top', 'gilded'],
      query: '',
      search: {
        string: '',
        open: false,
        sub: true,
        time: ['year', 'month', 'week', 'day', 'hour'],
        timecurrent: '',
        global: false
      },
      layout: ['list', 'th', 'newspaper-o', 'picture-o'],
      currentLayout: 0
    },
    actions,
    mutations,
    getters,
    plugins: [vuexLocal.plugin]
  })
}

export default store
