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
        >
          <img :src="post.data.preview.images[0].source.url" />
        </header>

        <section>
          <h6  v-bind:class="heading">{{ post.data.title | truncate(150) }}</h6>
        </section>

        <section v-if="post.data.selftext">
          <div>{{post.data.selftext | truncate(200)}}</div>
        </section>

        <footer>
          <span
            v-on:click="addSub(post.data.subreddit)"
          >
            {{post.data.subreddit}} - 
            {{post.data.created_utc | date}}
          </span>
          <a 
            :href="'http://www.reddit.com' + post.data.permalink"
            target="_blank"
          >
            <i class="fa fa-comment"></i>
          </a>

          <a 
            :href="post.data.url"
            target="_blank"
          >
            <i class="fa fa-plus"></i>
          </a>
          <span v-if="post.data.ups">
            <i class="fa fa-arrow-up"></i>
            {{post.data.ups}}
          </span>
        </footer>
      </div>

    </article>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
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
    ])
  },

  mounted () {
    this.$store.dispatch('commitPosts')
  }
}
</script>