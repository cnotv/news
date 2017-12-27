<template>
  <div
    class="c-row"
    v-if="getPosts && getPosts.length > 0"
    >
    <span v-if="!statusOnline">You are offline.</span>
    <article 
      class="o-card o-card--hidden-footer" 
      v-bind:class="'c-col-1-'+getCurrentLayout"
      v-if="!getSearchOpen || getSearchSub"
      v-for="post in getPosts"
    >
      <a 
        :href="post.data.url"
        target="_blank"
      >
        <div class="o-card__wrap">
          <header
            class="o-card__header"
            v-if="post.data.domain =='youtube.com' || post.data.domain =='youtu.be'"
            v-on:click="toggleModal(post.data.url)"
          >
              <iframe  width="100%" :src="post.data.url | embed" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
          </header>
          <header
            class="o-card__header"
            v-else-if="post.data.preview"
            v-on:click="toggleModal(post.data.url)"
          >
              <img v-lazy="post.data.preview.images[0].variants.gif.source.url" v-if="post.data.preview.images[0].variants.gif" />
              <img v-lazy="post.data.preview.images[0].source.url" v-else="post.data.preview" />
          </header>

          <section>
            <h6  v-bind:class="heading">{{ post.data.title | truncate(150) }}</h6>
          </section>

          <section v-if="post.data.selftext">
            <div>{{post.data.selftext | truncate(200)}}</div>
          </section>

          <footer>
            <span>
              <a
                href="#"
                class="c-btn-alt"
                v-on:click="addSub(post.data.subreddit)"
              >
                {{post.data.subreddit}}
              </a>
              {{post.data.created_utc | date}}
            </span>
            <a 
              :href="'http://www.reddit.com' + post.data.permalink"
              target="_blank"
            >
              <i class="fa fa-comment"></i>
            </a>
            <span v-if="post.data.ups">
              <i class="fa fa-arrow-up"></i>
              {{post.data.ups}}
            </span>
          </footer>

        </div>
      </a>
    </article>

    <section
        class="c-col-1-4"
        v-else
      >
        <a
          href="#"
          v-on:click="addSub(post.data.subreddit)"
        >/r/{{post.data.subreddit}}</a>
    </section>

    <modal v-if="modalOpen" />
  </div>

  <div v-else-if="getPosts">Sorry, no post found.</div>
  <div
    v-else
    class="is-loading"
  ></div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import modal from '@/components/modal'

export default {
  components: { modal },
  data () {
    return {
      modalOpen: false,
      statusOnline: true,
      noStorage: window.localStorage.getItem('vuex') === null
    }
  },
  props: {
    heading: {
      headingClass: (string) => {
        string = string.toString()
        if (string < 20) {
          return 'h2'
        } else if (string > 20 & string < 40) {
          return 'h4'
        } else {
          return 'h6'
        }
      }
    }
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
    ...mapActions([
      'addSub'
    ]),
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