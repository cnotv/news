<template>
  <article>
    <header>
      <a :href="post.data.url" target="_blank"
        >{{ post.data.title }}
      </a>
    </header>

    <small class="o-list__meta">
      <span>{{ date(post.data.created_utc) }}</span>

      <a :href="'//' + post.data.domain" target="_blank">{{
        post.data.domain
      }}</a>

      <button
        v-if="getSearch.open"
        v-on:click="addSub(post.data.subreddit)"
      >
        <i class="fa fa-plus"></i>
        /r/{{ post.data.subreddit }}
      </button>

      <span class="u-spacer--x"></span>

      <a
        :href="'http://www.reddit.com' + post.data.permalink"
        target="_blank"
      >
        <i class="fa fa-comment"></i>
        {{ post.data.num_comments }}
      </a>
    </small>
    <hr />
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { mixins } from "@/mixins";

export default defineComponent({
  name: "List",
  props: ["post"],
  mixins: [mixins],
  computed: {
    ...mapGetters(["getSearch"])
  }
});
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
