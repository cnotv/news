<template>
  <section class="c-section">
    <div class="c-container-full" ref="container">
      <div
        ref="posts"
        class
        v-bind:class="[
          getLayout === 0 ? '' : '',
          getLayout === 1 ? 'c-row' : '',
          getLayout === 2 ? 'o-paper' : '',
          getLayout === 3 ? 'o-gallery' : ''
        ]"
        v-if="getPosts.length > 0"
      >
        <span v-if="!statusOnline">You are offline.</span>

        <template v-if="getLayout === 0">
          <List
            v-for="post in getPosts"
            v-bind:post="post"
            :key="post.data.id"
          />
        </template>
        <Card
          v-else-if="getLayout === 1"
          v-for="post in getPosts"
          v-bind:post="post"
          :key="post.data.id"
        />
        <Paper
          v-else-if="getLayout === 2"
          v-for="post in getPosts"
          v-bind:post="post"
          :key="post.data.id"
        />
        <Gallery
          v-else-if="getLayout === 3"
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
    </div>
  </section>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import { mapGetters, mapActions } from "vuex";
import Modal from "@/components/Modal.vue";
import Card from "@/components/Card.vue";
import Gallery from "@/components/Gallery.vue";
import List from "@/components/List.vue";
import Paper from "@/components/Paper.vue";
import Subreddit from "@/components/Subreddit.vue";
import { getSubreddits } from "@/store/getters";

export default defineComponent({
  name: "home",
  components: { Modal, Card, Gallery, List, Subreddit, Paper },
  data() {
    return {
      refresh: false,
      modalOpen: false,
      statusOnline: true,
      loadThreshold: 0,
      noStorage: window.localStorage.getItem("vuex") === null
    };
  },

  computed: {
    ...mapGetters([
      "getLayout",
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
      modalOpen = !modalOpen;
    },

    _refreshListener() {
      const el = $refs.container as HTMLElement;
      if (el) {
        el.addEventListener("touchend", _handleTouchEnd);
        el.addEventListener("touchstart", _handleTouchStart);
      }
    },

    _loadMoreListener() {
      window.addEventListener("scroll", _loadMore);
    },

    _removeListeners() {
      const el = $refs.container as HTMLElement;
      if (el) {
        el.removeEventListener("touchend", _handleTouchEnd);
        el.removeEventListener("touchstart", _handleTouchStart);
        el.removeEventListener("scroll", _loadMore);
      }
    },

    _checkWelcome() {
      if (!getQuery || !getSubreddits) {
        $router.push({ name: "welcome" });
      }
    },

    _toggleNetworkStatus({ type }): void {
      statusOnline = type === "online";
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
          refresh = true;
        } else {
          refresh = false;
        }
      } else {
        el.style.transform = `translateY(0)`;
        refresh = false;
      }
    },

    /**
     * Refresh if active.
     * Delete style alteration always.
     */
    _refreshTrigger(): void {
      const el = document.querySelector("body");
      el!.style.transform = `translateY(0)`;
      if (refresh) {
        $store.dispatch("commitPosts");
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
        const el = document.querySelector("body");
        _refreshCheck(Y1, Y2, el!);
      };

      window.addEventListener("touchmove", move);
    },

    _handleTouchEnd(): void {
      _refreshTrigger();
    },

    /**
     * Online check and local storage save
     */
    _handleOffline(): void {
      const noStorage = window.localStorage.getItem("vuex") === null;

      // not online
      if (!window.navigator) {
        statusOnline = false;
        return;
      }

      // online
      statusOnline = Boolean(window.navigator.onLine);

      if (!statusOnline) {
        window.addEventListener("offline", _toggleNetworkStatus);
        window.addEventListener("online", _toggleNetworkStatus);

        if (noStorage) {
          $store.dispatch("commitPosts");
        } else {
          // offline mode
          $store.commit(
            "commitPosts",
            JSON.parse(window.localStorage.getItem("vuex") || "")
          );
        }
      }
    },

    /**
     * Infinite scroll
     */
    _loadMore(): void {
      const el = $refs.posts as HTMLElement;

      if (!el) {
        return;
      }

      if (!loadThreshold) {
        loadThreshold = el.offsetHeight;
      }

      // TODO: Replace with "el" after setting CSS grid layout
      const offset = window.scrollY - el.offsetHeight + loadThreshold;
      const trigger = offset > 0;
      if (trigger && !$store.state.loading) {
        $store.dispatch("loadMore");
      }
    }
  },

  created(): void {},
  destroyed(): void {
    _removeListeners();
  },

  mounted(): void {
    _refreshListener();
    _loadMoreListener();
    _checkWelcome();

    // display post default
    $store.dispatch("commitPosts");
    _handleOffline();
  }
});
</script>
