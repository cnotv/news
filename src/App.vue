<template>
  <div id="app">
    <news-header/>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import newsHeader from '@/components/header'
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

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
      currentSub: 'technews',
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
      },
      changeCurrent (state, newCurrent) {
        state.currentSub = newCurrent
      }
    },

    getters: {
      changeCurrent: (state, getters) => (newCurrent) => {
        state.currentSub = newCurrent
      },
      getData: (state, getters) => (currentSub, search, order) => {
        return axios.get(`http://www.reddit.com/r/` + currentSub + `/` + order + `.json?q=` + search, {
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
    },

    actions: {
    }
  })
}

export default {
  name: 'app',
  components: { newsHeader },
  store,
  computed: {
    ...Vuex.mapGetters([
      'changeCurrent',
      'getData'
    ]),
    ...Vuex.mapState([
      'subreddits',
      'currentSub'
    ])
  }
}
</script>

<style lang="scss" src="./assets/styles/main.scss"></style>
<style lang="scss">
</style>
