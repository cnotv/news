<template>
  <section class="c-section">
    <div class="c-container-full">
      <h1>{{ currentSub }}</h1>

      <ul>
        <li v-for="post in posts">
          <h2>{{ post.title }}</h2>
          <p>{{ post.excerpt }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    currentSub () {
      return this.$store.state.currentSub
    },
    posts () {
      return this.$getData
    }
  },
  methods: {
  }
}
</script>