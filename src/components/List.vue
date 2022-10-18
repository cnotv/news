<template>
  <article>
    <header>
      <a :href="data.url" target="_blank">{{ data.title }} </a>
    </header>

    <small class="o-list__meta">
      <span>{{ date(data.created_utc) }}</span>

      <a :href="'//' + data.domain" target="_blank">{{ data.domain }}</a>

      <button v-if="getSearch.open" @click="addSub(data.subreddit)">
        <i class="fa fa-plus"></i>
        /r/{{ data.subreddit }}
      </button>

      <span class="u-spacer--x"></span>

      <div
        @click="
          togglePost({
            link: `https://cors-anywhere.herokuapp.com/${data.url}`,
            comments: `https://cors-anywhere.herokuapp.com/http://www.reddit.com${data.permalink}`,
          })
        "
      >
        <i class="fa fa-solid fa-link"></i>
      </div>

      <span class="u-spacer--x"></span>

      <a :href="'http://www.reddit.com' + data.permalink" target="_blank">
        <i class="fa fa-comment"></i>
        {{ data.num_comments }}
      </a>
    </small>
    <hr />
  </article>
</template>

<script lang="ts">
  import { mapActions, mapGetters } from 'vuex'
  import { defineComponent, PropType } from 'vue'
  import { mixins } from '@/mixins'
  import { RedditPost } from '@/types/reddit-posts'

  export default defineComponent({
    name: 'List',
    mixins: [mixins],
    props: {
      data: {
        type: Object as PropType<RedditPost>,
        default: () => null,
      },
    },
    computed: {
      ...mapGetters(['getSearch']),
    },
    methods: {
      ...mapActions(['togglePost']),
    },
  })
</script>

<style scoped>
  header {
    font-weight: bold;
    font-size: 3vh;
  }
  button {
    background-color: transparent;
    border: 0;
    cursor: pointer;
  }
</style>
