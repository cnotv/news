<template>
  <section class="c-section">
    <div class="c-container-full">
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
        v-if="getPosts && getPosts.length > 0"
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
        <Subreddit v-else v-for="post in getPosts" v-bind:post="post" :key="post.data.id" />

        <modal v-if="modalOpen" />
      </div>

      <div v-else-if="getPosts">Sorry, no post found.</div>
      <div v-else class="is-loading"></div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import Modal from "@/components/modal";
import Card from "@/components/postCard";
import Gallery from "@/components/postGallery";
import List from "@/components/postList";
import Paper from "@/components/postPaper";
import Subreddit from "@/components/postSubreddit";
import { getSubreddits } from "@/store/getters";

export default Vue.extend({
  name: "home",
  components: { Modal, Card, Gallery, List, Subreddit, Paper },
  data() {
    return {
      refresh: false,
      modalOpen: false,
      statusOnline: true,
      noStorage: window.localStorage.getItem("vuex") === null
    };
  },

  computed: {
    ...mapGetters([
      "getCurrentLayout",
      "isLoading",
      "getPosts",
      "getQuery",
      "getSearch",
      "getSubreddits"
    ])
  },
  methods: {
    ...mapActions(["commitPosts"]),

    toggleModal(): void {
      this.modalOpen = !this.modalOpen;
    },

    _toggleNetworkStatus({ type }): void {
      this.statusOnline = type === "online";
    },

    /**
     * Check if a refresh is required
     */
    _refreshCheck(y1: number, y2: number, el: HTMLElement): void {
      const threshold = 150;
      const offsetY = y2 - y1;
      if (window.scrollY <= 0) {
        if (offsetY < threshold) {
          el.style.transform = `translateY(${offsetY}px)`;
        }
        if (offsetY > threshold / 1.5) {
          this.refresh = true;
        } else {
          this.refresh = false;
        }
      } else {
        el.style.transform = `translateY(0)`;
        this.refresh = false;
      }
    },

    /**
     * Refresh if active.
     * Delete style alteration always.
     */
    _refreshTrigger(): void {
      const el = document.querySelector('body')
      el!.style.transform = `translateY(0)`;
      if (this.refresh) {
        this.$store.dispatch("commitPosts");
      }
    },

    /**
     * Handle touch events for mobile:
     * - Top offset for refreshing
     * - Side swipes for changing subreddit
     */
    _handleTouchStart($start: TouchEvent): void {
      const X1 = $start.touches[0].screenX;
      const Y1 = $start.touches[0].screenY;

      const move = ($move: TouchEvent): void => {
        const X2 = $move.touches[0].screenX;
        const Y2 = $move.touches[0].screenY;
        const el = document.querySelector('body')
        this._refreshCheck(Y1, Y2, el!);
      };

      window.addEventListener("touchmove", move);
    },

    _handleTouchEnd(): void {
      this._refreshTrigger();
    },

    /**
     * Online check and local storage save
     */
    _handleOffline(): void {
      const noStorage = window.localStorage.getItem("vuex") === null;

      // not online
      if (!window.navigator) {
        this.statusOnline = false;
        return;
      }

      // online
      this.statusOnline = Boolean(window.navigator.onLine);

      if (!this.statusOnline) {
        window.addEventListener("offline", this._toggleNetworkStatus);
        window.addEventListener("online", this._toggleNetworkStatus);

        if (noStorage) {
          this.$store.dispatch("commitPosts");
        } else {
          // offline mode
          this.$store.commit(
            "commitPosts",
            JSON.parse(window.localStorage.getItem("vuex") || '')
          );
        }
      }
    },

    /**
     * Infinite scroll
     */
    _loadMore(): void {
      const el = this.$refs.posts as HTMLElement;

      if (!el) {
        return;
      }

      const threshold = 850;
      // TODO: Replace with "el" after setting CSS grid layout
      const offset = window.scrollY - el.offsetHeight + threshold;
      const trigger = offset > 0;
      if (trigger && !this.$store.state.loading) {
        this.$store.dispatch("loadMore");
      }
    }
  },

  created: function(): void {
    window.addEventListener("touchend", this._handleTouchEnd);
    window.addEventListener("touchstart", this._handleTouchStart);
    // TODO: Replace with "el" after setting CSS grid layout
    window.addEventListener("scroll", this._loadMore);
  },
  destroyed: function(): void {
    window.removeEventListener("touchend", this._handleTouchEnd);
    window.removeEventListener("touchstart", this._handleTouchStart);
    // TODO: Replace with "el" after setting CSS grid layout
    window.addEventListener("scroll", this._loadMore);
  },

  mounted(): void {
    if (!this.getQuery || !this.getSubreddits) {
      this.$router.push({ name: "welcome" });
    }

    // display post default
    this.$store.dispatch("commitPosts");
    this._handleOffline();
  }
});
</script>
