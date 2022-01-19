<template>
  <header
    class="o-header u-sticky"
    :class="{
      'has-menu-open': openMenu,
      'has-search-open': getSearch.open,
    }"
  >
    <nav class="o-nav-h">
      <ul
        v-if="getSubreddits.length > 0"
        class="o-nav-h__left o-nav-h__menu fadeIn"
        @click="toggleMenu"
      >
        <li v-for="subreddit in getSubreddits" :key="subreddit" class="o-nav-h__menu__item">
          <a v-if="openSettings" class="o-nav-h__action" @click="removeSub(subreddit)">
            <i class="fa fa-times-circle" aria-hidden="true"></i>
            {{ subreddit }}
          </a>

          <a
            v-if="!openSettings"
            class="o-nav-h__action"
            :class="{ 'is-active': subreddit == getCurrentSub }"
            @click="navigate(subreddit)"
            >{{ subreddit }}</a
          >
        </li>
      </ul>

      <a
        v-else-if="!getSearch.open && !openSettings"
        class="o-nav-h__action"
        @click="toggleSearchTopic"
        >Add a topic</a
      >

      <span v-else></span>

      <search v-if="getSearch.open"></search>

      <div class="o-nav-h__right">
        <a
          v-if="getSubreddits.length > 0"
          class="o-nav-h__action o-nav-h__burger"
          @click="toggleMenu"
        >
          <i class="fa fa-navicon o-nav-h__icon"></i
        ></a>

        <!-- Current Sub -->
        <span
          v-if="!(getSearch.open || openSettings) && getCurrentSub"
          class="o-nav-h__item u-hidden--desktop"
          >{{ getCurrentSub }}</span
        >

        <span class="u-spacer--x"></span>

        <router-link
          v-if="!getSearch.open && openSettings"
          class="o-nav-h__action"
          :to="{ name: 'welcome' }"
          >Suggest</router-link
        >

        <button
          v-if="!getSearch.open && openSettings"
          class="o-nav-h__action"
          @click="resetSettings"
        >
          Reset
        </button>

        <!-- Settings -->
        <button
          v-if="!getSearch.open"
          class="o-nav-h__action"
          :class="{ 'is-active': openSettings }"
          @click="toggleSettings"
        >
          <i class="fa fa-cog o-nav-h__icon"></i>
        </button>

        <!-- Reddit -->
        <button
          v-if="!(getSearch.open && !isSubreddits())"
          class="o-nav-h__action"
          :class="{ 'is-active': isSubreddits() }"
          @click="searchSub"
        >
          <i v-if="!isSubreddits()" class="fa fa-reddit o-nav-h__icon"></i>
          <i v-if="isSubreddits()" class="fa fa-times o-nav-h__icon"></i>
        </button>

        <!-- Search -->
        <button
          v-if="!isSubreddits()"
          class="o-nav-h__action o-search__toggle"
          :class="{ 'is-active': getSearch.open }"
          @click="toggleSearch"
        >
          <i class="fa o-nav-h__icon"></i>
        </button>
      </div>
    </nav>

    <nav v-if="openSettings || (getSearch.open && !isSubreddits())" class="o-nav-sub">
      <div v-if="!getSearch.open" class="o-nav-sub__group fadeIn">
        <news-order />
      </div>

      <div v-if="getSearch.open" class="o-nav-sub__group fadeIn">
        <span class="o-nav-sub__label">View post till:</span>
        <button
          class="o-nav-sub__action"
          :class="{ 'is-active': '' === getSearch.currentTime }"
          @click="changeSearchTime('')"
        >
          X
        </button>
        <button
          v-for="time in times"
          :key="time"
          class="o-nav-sub__action"
          :class="{ 'is-active': time === getSearch.currentTime }"
          @click="changeSearchTime(time)"
        >
          {{ time[0].toUpperCase() }}
        </button>
      </div>

      <div class="o-nav-sub__group fadeIn">
        <span class="o-nav-sub__label">Layout:</span>
        <button
          v-for="(layout, index) in layouts"
          :key="index"
          class="o-nav-sub__action"
          :class="{ 'is-active': index === getLayout }"
          @click="changeLayout(index)"
        >
          <span :class="'fa fa-' + layout"></span>
        </button>
      </div>

      <div class="o-nav-sub__group fadeIn">
        <span class="o-nav-sub__label">Posts:</span>
        <button
          v-for="limit in limits"
          :key="limit"
          class="o-nav-sub__action"
          :class="{ 'is-active': limit === getLimit }"
          @click="changeLimit(limit)"
        >
          {{ limit }}
        </button>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mapGetters, mapActions } from 'vuex'
  import newsOrder from '@/components/order.vue'
  import search from '@/components/search.vue'
  import { store } from '@/store'
  import { LIMITS, LAYOUTS, TIMES } from '@/data/settings'

  export default defineComponent({
    components: { newsOrder, search },
    data() {
      return {
        openMenu: false,
        openSettings: false,
        limits: LIMITS,
        layouts: LAYOUTS,
        times: TIMES,
      }
    },
    computed: {
      ...mapGetters([
        'getCurrentSub',
        'getLayout',
        'getLimit',
        'getQuery',
        'getSearch',
        'getSubreddits',
      ]),
    },
    methods: {
      ...mapActions([
        'changeLayout',
        'changeLimit',
        'changeSearch',
        'changeSearchOpen',
        'changeSearchTime',
        'changeSub',
        'removeSub',
      ]),
      toggleMenu() {
        this.openMenu = !this.openMenu
        store.dispatch('changeSearchOpen', true)
      },
      toggleSettings() {
        this.openSettings = !this.openSettings
        this.openMenu = false
      },
      toggleSearch() {
        this.openMenu = false
        this.openSettings = false
        store.dispatch('changeSearchOpen')
        if (!this.getSearch.open) {
          store.dispatch('changeSearch', '')
        }
      },
      resetSettings() {
        localStorage.clear()
        location.reload()
        store.dispatch('resetState')
      },
      toggleSearchTopic() {
        this.searchSub()
      },
      navigate(menu: string) {
        this.changeSub(menu)
        if (this.$route.name !== 'home') {
          this.$router.push({ name: 'home' })
        }
      },
      searchSub() {
        if (this.$route.name === 'home') {
          this.$router.push({ name: 'subreddits' })
          this.toggleSearch()
        } else {
          this.$router.push({ name: 'home' })
          this.toggleSearch()
        }
      },
      isSubreddits() {
        return this.$route.name === 'subreddits'
      },
    },
  })
</script>
