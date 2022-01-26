<template>
  <section class="c-col" @click="addSub(data.name)">
    <h1 class="c-h1">/r/{{ data.name }} - {{ data.title }}</h1>
    <h5>{{ data.description }}</h5>

    <i class="fa fa-plus-circle"></i>
    <span> {{ data.subscribers }}</span>
    <span v-if="data.categories"> - {{ data.categories }}</span>
    <br />
    <hr />
  </section>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { mixins } from '@/mixins'
  import { SubredditsIndex } from '@/types/reddit-subreddits'

  export default defineComponent({
    name: 'Subreddit',
    mixins: [mixins],
    props: {
      data: {
        type: Object as PropType<SubredditsIndex>,
        default: () => null,
      },
    },
  })
</script>

<style scoped>
  .c-h1 {
    font-weight: bold;
    font-size: 3vh;
  }
</style>
