<template>
  <section class="c-section">
    <div class="c-container-full">

      <h1>{{ getCurrentSub }}</h1>

      <div class="c-row">
        <article 
          class="c-col-1-4 o-card is-loading" 
          v-for="post in getPosts"
        >
          <div class="o-card__wrap">

            <header v-if="post.data.preview">
              <img :src="post.data.preview.images[0].source.url" />
            </header>

            <section>
              <b>{{ post.data.title }}</b>
            </section>

            <section v-if="post.data.selftext">
              <div>{{post.data.selftext | truncate(200)}}</div>
            </section>

            <footer>
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
            </footer>
          </div>

        </article>
      </div>
    </div>
  </section>
</template>

<script>
import Vuex from 'vuex'

export default {
  filters: {
    truncate: function (string, value) {
      if (!value) return ''
      value = value.toString()
      string = string.toString()
      return `${string.substring(0, value)}...`
    }
  },
  computed: {
    ...Vuex.mapGetters([
      'getCurrentSub',
      'getPosts'
    ])
  },
  mounted () {
    this.$store.dispatch('commitPosts')
  }
}
</script>
