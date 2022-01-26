<template>
  <section class="c-section">
    <div class="c-container-full">
      <div v-if="getPosts.length > 0" ref="posts" class="c-row">
        <Subreddit v-for="post in getPosts" :key="post.id" :post="post" />
      </div>

      <div v-else-if="getPosts">Sorry, no subreddit found.</div>
      <div v-else class="is-loading"></div>
    </div>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mapGetters, mapActions } from 'vuex'
  import Subreddit from '@/components/Subreddit.vue'
  import { store } from '@/store'

  export default defineComponent({
    name: 'Home',
    components: { Subreddit },
    data() {
      return {
        refresh: false,
        modalOpen: false,
        statusOnline: true,
        noStorage: window.localStorage.getItem('vuex') === null,
      }
    },
    computed: {
      ...mapGetters(['isLoading', 'getSearch', 'getPosts']),
    },
    mounted(): void {
      store.dispatch('commitSubreddits')
    },
    methods: {
      ...mapActions(['commitSubreddits']),
    },
  })
</script>
