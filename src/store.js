import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const getData = (subreddits, search, order) => {
  return axios.get(`http://www.reddit.com/r/` + subreddits + `/` + order + `.json?q=` + search, {
    params: {
      page: 1,
      per_page: 5
    }
  })
    .then(json => {
      return { posts: json.data }
    })
    .catch(e => {
      return { error: e }
    })
}

const store = () => {
  return new Vuex.Store({
    state: {
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
      subreddits: ['technews', 'worldnews', 'robotics', 'TechDIY'],
      order: null,
      search: null,
      site_data: {}
    },

    mutations: {
      changeOrder (state, newOrder) {
        state.order = newOrder
      },
      changeSubreddits (state, newSubreddits) {
        state.subreddits = newSubreddits
      },
      changeSearch (state, newSearch) {
        state.search = newSearch
      }
    },

    actions: {
    }
  })
}

export default {store, getData}
