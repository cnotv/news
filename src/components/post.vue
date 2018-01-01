<template>
  <div
    v-bind:class="[getCurrentLayout === '4' ? 'o-gallery' : 'c-row']"
    v-if="getPosts && getPosts.length > 0"
    >
    <span v-if="!statusOnline">You are offline.</span>

    <List 
      v-if="getSearchSub && getCurrentLayout === '1'"
      v-for="post in getPosts"
      v-bind:post="post"
      :key="post.data.id"
    />
    <Card 
      class="c-col-1-4 o-card o-card--hidden-footer"
      v-else-if="getSearchSub && getCurrentLayout === '2'"
      v-bind:post="post"
      :key="post.data.id"
    />
    <Newspaper
      v-else-if="getSearchSub && getCurrentLayout === '3'"
      v-bind:post="post"
      :key="post.data.id"
    />
    <Gallery
      v-else-if="getSearchSub && getCurrentLayout === '4'"
      v-bind:post="post"
      :key="post.data.id"
    />
    <Subreddit
      class="c-col-1-4"
      v-else
      v-bind:post="post"
      :key="post.data.id"
    />

    <modal v-if="modalOpen"/>
  </div>

  <div v-else-if="getPosts">Sorry, no post found.</div>
  <div
    v-else
    class="is-loading"
  ></div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import Modal from '@/components/modal'
import Card from '@/components/postCard'
import Gallery from '@/components/postGallery'
import List from '@/components/postList'
import Newspaper from '@/components/postNewspaper'
import Subreddit from '@/components/postSubreddit'

// Distribute to components using global mixin
Vue.mixin({
  methods: {
    ...mapActions([
      'addSub'
    ])
  },
  filters: {
    truncate: (string, value) => {
      if (!value) return ''
      value = value.toString()
      let stringNew = string.toString()
      stringNew = stringNew.substring(0, value)
      if (string.length > value) {
        stringNew += '...'
      }
      return stringNew
    },
    date: (value) => {
      let newDate = new Date(value * 1000)
      return newDate.toLocaleDateString('en-GB')
    },
    embed: (url) => {
      return url.replace('watch?v=', 'embed/')
    }
  }
})

export default {
  components: { Modal, Card, Gallery, List, Subreddit, Newspaper },
  data () {
    return {
      modalOpen: false,
      statusOnline: true,
      noStorage: window.localStorage.getItem('vuex') === null
    }
  },

  computed: {
    ...mapGetters([
      'getPosts',
      'getCurrentLayout',
      'getSearchOpen',
      'getSearchSub'
    ])
  },
  methods: {
    toggleModal (content) {
      this.modalOpen = !this.modalOpen
    },
    _toggleNetworkStatus ({ type }) {
      this.online = type === 'online'
    }
  },

  mounted () {
    if (!window.navigator) {
      // console.log('You are not online')
      this.statusOnline = false
      return
    }

    // console.log('You are online')
    this.statusOnline = Boolean(window.navigator.onLine)

    if (!this.statusOnline) {
      window.addEventListener('offline', this._toggleNetworkStatus)
      window.addEventListener('online', this._toggleNetworkStatus)

      // console.log('Loading offline mode...')
      if (this.noStorage) {
        this.$store.dispatch('commitPosts')
        // console.log('Cant load offline: you have no store :( ', this.noStorage)
      } else {
        this.$store.commit('commitPosts', JSON.parse(window.localStorage.getItem('vuex')))
        // console.log('Offline mode loaded')
      }
    }
  }
}
</script>