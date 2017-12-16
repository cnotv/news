import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

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
      subreddits: ['technews', 'news', 'WorldNews', 'robotics', 'TechDIY', 'gamernews', 'gamingnews', 'vuejs', 'gifrecipes'],
      currentSub: 'technews',
      limits: ['10', '25', '50', '100'],
      currentLimit: '25',
      currentOrder: 'new',
      order: ['hot', 'new', 'rising', 'controversial', 'top', 'gilded'],
      query: 'technews/new.json',
      search: '',
      searchTime: ['year', 'month', 'day', 'hour'],
      searchTimeCurrent: '',
      searchGlobal: false,
      site_data: {}
    },
    actions,
    mutations,
    getters
  })
}

export default store
