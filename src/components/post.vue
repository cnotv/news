<template>
  <div
    class="c-row"
    v-if="getPosts && getPosts.length > 0"
    >
    <article 
      class="o-card o-card--hidden-footer" 
      v-bind:class="'c-col-1-'+getCurrentLayout"
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
            <img v-if="post.data.preview.images[0].variants.gif" :src="post.data.preview.images[0].variants.gif.source.url" />
            <img v-else="post.data.preview" :src="post.data.preview.images[0].source.url" />
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
      modalOpen: false
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
      'getCurrentLayout'
    ])
  },
  methods: {
    ...mapActions([
      'addSub'
    ]),
    toggleModal (content) {
      this.modalOpen = !this.modalOpen
    }
  },

  mounted () {
    this.$store.dispatch('commitPosts')
  }
}
</script>