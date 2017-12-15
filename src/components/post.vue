<template>
  <div class="c-row">
    <article 
      class="c-col-1-4 o-card is-loading" 
      v-for="post in getPosts"
    >

      <div class="o-card__wrap">

        <header
          class="o-card__header"
          v-if="post.data.preview"
          v-on:click="toggleModal(post.data.url)"
        >
          <a 
            :href="post.data.url"
            target="_blank"
          >
            <img v-if="post.data.preview.images[0].variants.gif" :src="post.data.preview.images[0].variants.gif.source.url" />
            <img v-else :src="post.data.preview.images[0].source.url" />
          </a>
        </header>

        <section>
          <h6  v-bind:class="heading">{{ post.data.title | truncate(150) }}</h6>
        </section>

        <section v-if="post.data.selftext">
          <div>{{post.data.selftext | truncate(200)}}</div>
        </section>

        <footer>
          <span>
            <button
              v-on:click="addSub(post.data.subreddit)"
            >
              {{post.data.subreddit}}
            </button>
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

    </article>

    <modal v-if="modalOpen" />
  </div>
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
    }
  },

  computed: {
    ...mapGetters([
      'getCurrentSub',
      'getPosts'
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