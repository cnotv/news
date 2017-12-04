<template>
  <section class="c-section">
    <div class="c-container-full">

      <select>
        <option v-for="order in getOrder">{{ order }}</option>
      </select>

      <h1>{{ getCurrent }}</h1>

      <ul>
        <li v-for="post in getPosts">
          <h2>{{ post.title }}</h2>
          <p>{{ post.excerpt }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import Vuex from 'vuex'

export default {
  mounted () {
  },
  computed: {
    ...Vuex.mapGetters([
      'getCurrent',
      'getOrder',
      'getPosts'
    ])
  },
  methods: {
    changeOrder (current) {
      this.$store.dispatch('changeOrder', current)
    }
  }
}
</script>