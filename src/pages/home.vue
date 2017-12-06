<template>
  <section class="c-section">
    <div class="c-container-full">
      <input type="checkbox" v-model="debug">
      <input type="checkbox" v-model="pictures">

      <h1>{{ getCurrentSub }}</h1>

      <article v-for="post in getPosts">
        <a 
          :href="'http://www.reddit.com' + post.data.permalink"
          target="_blank"
        >
          <img
            v-if="pictures"
            :src="post.data.preview.images[0].source.url"
          />
          <img
            v-if="post.data.thumbnail"
            :src="post.data.thumbnail" 
          />
          <b>{{ post.data.title }}</b>
        </a>

        <a 
          :href="post.data.url"
          target="_blank"
        ><p>{{ post.data.domain }}</p></a>
        </a>

        <div
          v-if="post.data.selftext"
        >{{post.data.selftext | truncate(200)}}</div>

        <pre v-if="debug">{{ post.data }}</pre>
      </article>
    </div>
  </section>
</template>

<script>
import Vuex from 'vuex'

export default {
  data () {
    return {
      debug: false,
      pictures: false
    }
  },
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
  }
}
</script>
