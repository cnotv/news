<template>
  <article>
    <header>
      <a :href="this.post.data.url" target="_blank"
        >{{ this.post.data.title }}
      </a>
    </header>

    <small class="o-list__meta">
      <span>{{ this.post.data.created_utc | date }}</span>

      <a :href="'//' + this.post.data.domain" target="_blank">{{
        this.post.data.domain
      }}</a>

      <button
        v-if="getSearch.open"
        v-on:click="addSub(this.post.data.subreddit)"
      >
        <i class="fa fa-plus"></i>
        /r/{{ this.post.data.subreddit }}
      </button>

      <span class="u-spacer--x"></span>

      <a
        :href="'http://www.reddit.com' + this.post.data.permalink"
        target="_blank"
      >
        <i class="fa fa-comment"></i>
        {{ this.post.data.num_comments }}
      </a>
    </small>
    <hr />
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "List",
  props: ["post"],
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
