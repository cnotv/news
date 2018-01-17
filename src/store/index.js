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
      page: {
        id: null,
        excerpt: null,
        slug: null,
        title: null,
        content: null
      },
      posts: null,
      post: {
        id: null,
        date: null,
        score: null,
        link: null,
        source: null,
        featured_media: null,
        title: null,
        excerpt: null,
        content: null
      },
      subreddit: {
        id: null,
        name: null,
        slug: null
      },
      subreddits: [],
      currentSub: 'WorldNews',
      limits: ['12', '24', '48', '96'],
      currentLimit: '24',
      currentOrder: 'new',
      order: ['hot', 'new', 'rising', 'controversial', 'top', 'gilded'],
      query: '',
      search: '',
      searchOpen: false,
      searchSub: true,
      searchTime: ['year', 'month', 'day', 'hour'],
      searchTimeCurrent: '',
      searchGlobal: false,
      layout: ['1', '2', '3', '4'],
      currentLayout: '2',
      site_data: {}
    },
    actions,
    mutations,
    getters,
    plugins: [vuexLocal.plugin]
  })
}

export default store
