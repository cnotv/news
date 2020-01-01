<template>
  <div v-if="getQuery === ''">
    <Welcome />
  </div>

  <div
    ref="posts"
    class
    v-bind:class="[
      getSearch.sub && getCurrentLayout === 0 ? '' : '',
      getSearch.sub && getCurrentLayout === 1 ? 'c-row' : '',
      getSearch.sub && getCurrentLayout === 2 ? 'o-paper' : '',
      getSearch.sub && getCurrentLayout === 3 ? 'o-gallery' : '',
      !getSearch.sub ? 'c-row' : ''
    ]"
    v-else-if="getPosts && getPosts.length > 0"
  >
    <span v-if="!statusOnline">You are offline.</span>

    <template v-if="getSearch.sub && getCurrentLayout === 0">
      <List v-for="post in getPosts" v-bind:post="post" :key="post.data.id" />
    </template>
    <Card
      v-else-if="getSearch.sub && getCurrentLayout === 1"
      v-for="post in getPosts"
      v-bind:post="post"
      :key="post.data.id"
    />
    <Paper
      v-else-if="getSearch.sub && getCurrentLayout === 2"
      v-for="post in getPosts"
      v-bind:post="post"
      :key="post.data.id"
    />
    <Gallery
      v-else-if="getSearch.sub && getCurrentLayout === 3"
      v-for="post in getPosts"
      v-bind:post="post"
      :key="post.data.id"
    />
    <Subreddit
      v-else
      v-for="post in getPosts"
      v-bind:post="post"
      :key="post.data.id"
    />

    <modal v-if="modalOpen" />
  </div>

  <div v-else-if="getPosts">Sorry, no post found.</div>
  <div v-else class="is-loading"></div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import Welcome from "@/components/welcome";
import Modal from "@/components/modal";
import Card from "@/components/postCard";
import Gallery from "@/components/postGallery";
import List from "@/components/postList";
import Paper from "@/components/postPaper";
import Subreddit from "@/components/postSubreddit";

// Distribute to components using global mixin
Vue.mixin({
  methods: {
    ...mapActions(["addSub"])
  },
  filters: {
    truncate: (string, value) => {
      if (!value) return "";
      value = value.toString();
      let stringNew = string.toString();
      stringNew = stringNew.substring(0, value);
      if (string.length > value) {
        stringNew += "...";
      }
      return stringNew;
    },
    date: value => {
      let newDate = new Date(value * 1000);
      return newDate.toLocaleDateString("en-GB");
    },
    embed: url => {
      return url.replace("watch?v=", "embed/");
    }
  }
});

export default {
  components: { Welcome, Modal, Card, Gallery, List, Subreddit, Paper },
  data() {
    return {
      modalOpen: false,
      statusOnline: true,
      noStorage: window.localStorage.getItem("vuex") === null
    };
  },

  computed: {
    ...mapGetters([
      "getQuery",
      "getPosts",
      "getCurrentLayout",
      "getSearch",
      "getLoading"
    ])
  },
  methods: {
    ...mapActions(["commitPosts"]),

    toggleModal(content) {
      this.modalOpen = !this.modalOpen;
    },

    _toggleNetworkStatus({ type }) {
      this.online = type === "online";
    },

    reload() {
      if (window.scrollY === 0) {
        this.$store.dispatch("commitPosts");
      }
    },

    loadMore() {
      const el = this.$refs.posts;

      if (!el) {
        return;
      }

      const threshold = 850;
      const offset = window.scrollY - el.offsetHeight + threshold;
      const trigger = offset > 0;
      if (trigger && !this.$store.state.loading) {
        this.$store.dispatch("loadMore");
      }
    }
  },

  created: function() {
    window.addEventListener("touchend", this.reload);
    window.addEventListener("scroll", this.loadMore);
  },
  destroyed: function() {
    window.removeEventListener("touchend", this.reload);
    window.addEventListener("scroll", this.loadMore);
  },

  mounted() {
    // display post default
    this.$store.dispatch("commitPosts");

    // online check and local storage save
    if (!window.navigator) {
      // console.log('You are not online')
      this.statusOnline = false;
      return;
    }

    // console.log('You are online')
    this.statusOnline = Boolean(window.navigator.onLine);

    if (!this.statusOnline) {
      window.addEventListener("offline", this._toggleNetworkStatus);
      window.addEventListener("online", this._toggleNetworkStatus);

      // console.log('Loading offline mode...')
      if (this.noStorage) {
        this.$store.dispatch("commitPosts");
        // console.log('Cant load offline: you have no store :( ', this.noStorage)
      } else {
        this.$store.commit(
          "commitPosts",
          JSON.parse(window.localStorage.getItem("vuex"))
        );
        // console.log('Offline mode loaded')
      }
    }
  }
};
</script>
