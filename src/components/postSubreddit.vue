<template>
  <section>
    <a
      href="#"
      v-on:click="addSub(post.data.subreddit)"
    >+ {{this.post.data.subreddit}}</a>
  </section>
</template>

<script>
export default {
  name: 'Subreddit',
  props: ['post'],
  data () {
    return {
    }
  }
}
</script>
<style scoped>
</style>