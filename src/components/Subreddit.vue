<template>
  <section class="c-col" @click="addSub(post.name)">
    <h1 class="c-h1">/r/{{ post.name }} - {{ post.title }}</h1>
    <h5>{{ post.description }}</h5>

    <i class="fa fa-plus-circle"></i>
    <span> {{ post.subscribers }}</span>
    <span v-if="post.categories"> - {{ post.categories }}</span>
    <br />
    <hr />
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mixins } from '@/mixins'

  export default defineComponent({
    name: 'Subreddit',
    mixins: [mixins],
    props: ['post'],
  })
</script>

<style scoped>
  .c-h1 {
    font-weight: bold;
    font-size: 3vh;
  }
</style>
