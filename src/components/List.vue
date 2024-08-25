<template>
  <article>
    <header>
      <a :href="data.url" target="_blank">{{ data.title }} </a>
    </header>

    <small class="o-list__meta">
      <span v-if="getSearch.open">{{ date(data.created_utc) }}</span>

      <a :href="'//' + data.domain" target="_blank">{{ data.domain }}</a>

      <span class="u-spacer--x"></span>

      <!-- <div
        @click="
          togglePost({
            source: data.url,
            link: `https://cors-anywhere.herokuapp.com/${data.url}`,
            comments: `https://cors-anywhere.herokuapp.com/http://www.reddit.com${data.permalink}`,
          })
        "
      >
        <i class="fa fa-solid fa-link"></i>
      </div> -->

      <span class="u-spacer--x"></span>

      <a :href="'http://www.reddit.com' + data.permalink" target="_blank">
        <i class="fa fa-comment"></i>
        {{ data.num_comments }}
      </a>
    </small>

    <small class="o-list__meta">
      <div v-if="search.global && getSearch.open" @click="addSub(data.subreddit)">
        <i class="fa fa-plus"></i>
        /r/{{ data.subreddit }}
      </div>
    </small>
    <hr />
  </article>
</template>

<script lang="ts">
import { mapActions, mapGetters, mapState } from 'vuex'
import { defineComponent, PropType } from 'vue'
import { mixins } from '@/mixins'

export default defineComponent({
  name: 'List',
  mixins: [mixins],
  props: {
    data: {
      type: Object as PropType<RedditPost>,
      default: () => null
    }
  },
  computed: {
    ...mapGetters(['getSearch']),
    ...mapState(['search'])
  },
  methods: {
    ...mapActions(['togglePost'])
  }
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
