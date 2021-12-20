<template>
  <section class="c-section">
    <div class="c-container-full">
      <div ref="posts" class="c-row" v-if="getPosts.length > 0">
        <Subreddit v-for="post in getPosts" v-bind:post="post" :key="post.id" />
      </div>

      <div v-else-if="getPosts">Sorry, no subreddit found.</div>
      <div v-else class="is-loading"></div>
    </div>
  </section>
</template>

<script lang="ts">
import {defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import Subreddit from "@/components/Subreddit.vue";
import { getPosts } from "@/store/getters";

export default defineComponent({
  name: "home",
  components: { Subreddit },
  data() {
    return {
      refresh: false,
      modalOpen: false,
      statusOnline: true,
      noStorage: window.localStorage.getItem("vuex") === null
    };
  },

  computed: {
    ...mapGetters(["isLoading", "getSearch", "getPosts"])
  },
  methods: {
    ...mapActions(["commitSubreddits"])
  },

  mounted(): void {
    $store.dispatch("commitSubreddits");
  }
});
</script>
