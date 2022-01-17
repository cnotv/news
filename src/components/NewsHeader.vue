<template>
  <header
    class="o-header u-sticky"
    v-bind:class="{
      'has-menu-open': openMenu,
      'has-search-open': getSearch.open
    }"
  >
    <nav class="o-nav-h">
      <ul
        v-if="getSubreddits.length > 0"
        class="o-nav-h__left o-nav-h__menu fadeIn"
        v-on:click="toggleMenu"
      >
        <li
          class="o-nav-h__menu__item"
          v-for="subreddit in getSubreddits"
          v-bind:key="subreddit"
        >
          <a
            class="o-nav-h__action"
            v-if="openSettings"
            v-on:click="removeSub(subreddit)"
          >
            <i class="fa fa-times-circle" aria-hidden="true"></i>
            {{ subreddit }}
          </a>

          <a
            class="o-nav-h__action"
            v-if="!openSettings"
            v-bind:class="{ 'is-active': subreddit == getCurrentSub }"
            v-on:click="navigate(subreddit)"
            >{{ subreddit }}</a
          >
        </li>
      </ul>

      <a
        class="o-nav-h__action"
        v-else-if="!getSearch.open && !openSettings"
        v-on:click="toggleSearchTopic"
        >Add a topic</a
      >

      <span v-else></span>

      <search v-if="getSearch.open"></search>

      <div class="o-nav-h__right">
        <a
          class="o-nav-h__action o-nav-h__burger"
          v-on:click="toggleMenu"
          v-if="getSubreddits.length > 0"
        >
          <i class="fa fa-navicon o-nav-h__icon"></i
        ></a>

        <!-- Current Sub -->
        <span
          class="o-nav-h__item u-hidden--desktop"
          v-if="!(getSearch.open || openSettings) && getCurrentSub"
          >{{ getCurrentSub }}</span
        >

        <span class="u-spacer--x"></span>

        <router-link
          class="o-nav-h__action"
          v-if="!getSearch.open && openSettings"
          :to="{ name: 'welcome' }"
          >Suggest</router-link
        >

        <button
          class="o-nav-h__action"
          v-on:click="resetSettings"
          v-if="!getSearch.open && openSettings"
        >
          Reset
        </button>

        <!-- Settings -->
        <button
          class="o-nav-h__action"
          v-on:click="toggleSettings"
          v-if="!getSearch.open"
          v-bind:class="{ 'is-active': openSettings }"
        >
          <i class="fa fa-cog o-nav-h__icon"></i>
        </button>

        <!-- Reddit -->
        <button
          class="o-nav-h__action"
          v-bind:class="{ 'is-active': isSubreddits() }"
          v-on:click="searchSub"
          v-if="!(getSearch.open && !isSubreddits())"
        >
          <i
            v-if="!isSubreddits()"
            class="fa fa-reddit o-nav-h__icon"
          ></i>
          <i
            v-if="isSubreddits()"
            class="fa fa-times o-nav-h__icon"
          ></i>
        </button>

        <!-- Search -->
        <button
          v-if="!isSubreddits()"
          class="o-nav-h__action o-search__toggle"
          v-on:click="toggleSearch"
          v-bind:class="{ 'is-active': getSearch.open }"
        >
          <i class="fa o-nav-h__icon"></i>
        </button>
      </div>
    </nav>

    <nav
      v-if="openSettings || getSearch.open && !isSubreddits()"
      class="o-nav-sub"
    >
      <div class="o-nav-sub__group fadeIn" v-if="!getSearch.open">
        <news-order />
      </div>

      <div class="o-nav-sub__group fadeIn" v-if="getSearch.open">
        <span class="o-nav-sub__label">View post till:</span>
        <button
          class="o-nav-sub__action"
          v-on:click="changeSearchTime('')"
          v-bind:class="{ 'is-active': '' === getSearch.currentTime }"
        >
          X
        </button>
        <button
          class="o-nav-sub__action"
          v-for="time in times"
          v-bind:key="time"
          v-on:click="changeSearchTime(time)"
          v-bind:class="{ 'is-active': time === getSearch.currentTime }"
        >
          {{ time[0].toUpperCase() }}
        </button>
      </div>

      <div class="o-nav-sub__group fadeIn">
        <span class="o-nav-sub__label">Layout:</span>
        <button
          class="o-nav-sub__action"
          v-for="(layout, index) in layouts"
          v-bind:key="index"
          v-on:click="changeLayout(index)"
          v-bind:class="{ 'is-active': index === getLayout }"
        >
          <span v-bind:class="'fa fa-' + layout"></span>
        </button>
      </div>

      <div class="o-nav-sub__group fadeIn">
        <span class="o-nav-sub__label">Posts:</span>
        <button
          class="o-nav-sub__action"
          v-for="limit in limits"
          v-bind:key="limit"
          v-on:click="changeLimit(limit)"
          v-bind:class="{ 'is-active': limit === getLimit }"
        >
          {{ limit }}
        </button>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import newsOrder from "@/components/order.vue";
import search from "@/components/search.vue";
import { store } from "@/store";
import { LIMITS, LAYOUTS, TIMES } from "@/data/settings";

export default defineComponent({
  data() {
    return {
      openMenu: false,
      openSettings: false,
      limits: LIMITS,
      layouts: LAYOUTS,
      times: TIMES
    };
  },
  components: { newsOrder, search },
  computed: {
    ...mapGetters([
      "getCurrentSub",
      "getLayout",
      "getLimit",
      "getQuery",
      "getSearch",
      "getSubreddits"
    ])
  },
  methods: {
    ...mapActions([
      "changeLayout",
      "changeLimit",
      "changeSearch",
      "changeSearchOpen",
      "changeSearchTime",
      "changeSub",
      "removeSub"
    ]),
    toggleMenu() {
      this.openMenu = !this.openMenu;
      store.dispatch("changeSearchOpen", true);
    },
    toggleSettings() {
      this.openSettings = !this.openSettings;
      this.openMenu = false;
    },
    toggleSearch() {
      this.openMenu = false;
      this.openSettings = false;
      store.dispatch("changeSearchOpen");
      if (!this.getSearch.open) {
        store.dispatch("changeSearch", "");
      }
    },
    resetSettings() {
      localStorage.clear();
      location.reload();
      store.dispatch("resetState");
    },
    toggleSearchTopic() {
      this.searchSub();
    },
    navigate(menu: string) {
      this.changeSub(menu);
      if (this.$route.name !== "home") {
        this.$router.push({ name: "home" });
      }
    },
    searchSub() {
      if (this.$route.name === "home") {
        this.$router.push({ name: "subreddits" });
        this.toggleSearch();
      } else {
        this.$router.push({ name: "home" });
        this.toggleSearch();
      }
    },
    isSubreddits() {
      return this.$route.name === 'subreddits'
    }
  }
});
</script>
