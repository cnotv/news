<template>
  <article>
    <header>
      <a :href="this.post.data.url" target="_blank"
        >{{ this.post.data.title }}
      </a>
    </header>

    <small class="o-list__meta">
      <button
        v-if="getSearch.open"
        v-on:click="addSub(this.post.data.subreddit)"
      >
        <i class="fa fa-plus"></i>
        /r/{{ this.post.data.subreddit }}
      </button>
      
      <a :href="'//' + this.post.data.domain" target="_blank">{{
        this.post.data.domain
      }}</a>

      <span>{{ this.post.data.created_utc | date }}</span>

      <span class="u-spacer--x"></span>

      <a
        :href="'http://www.reddit.com' + this.post.data.permalink"
        target="_blank"
      >
        <i class="fa fa-comment"></i>
        {{this.post.data.num_comments}}
      </a>
    </small>
    <hr />
  </article>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "List",
  props: ["post"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      "getSearch",
    ])
  },
};
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
