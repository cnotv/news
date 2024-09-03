<template>
  <header
    class="o-header u-sticky"
    :class="{
      'has-menu-open': openMenu,
      'has-search-open': getSearch.open
    }"
  >
    <nav class="o-nav-h">
      <draggable
        v-if="subreddits.length > 0"
        v-model="subreddits"
        class="o-nav-h__left o-nav-h__menu fadeIn"
        group="subreddits"
        item-key="id"
        @start="drag = true"
        @end="drag = false"
      >
        <template #item="{ element }">
          <div class="o-nav-h__menu__item">
            <a v-if="openSettings" class="o-nav-h__action" @click="removeSub(element.id)">
              <i class="fa fa-times-circle" aria-hidden="true"></i>
              {{ element.name }}
            </a>
            <a
              v-if="!openSettings"
              class="o-nav-h__action"
              :class="{ 'is-active': element.name == getCurrentSub }"
              @click="navigate(element.name)"
              >{{ element.name }}</a
            >
          </div>
        </template>
      </draggable>

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

    <!-- Sub-navigation bar -->
    <nav v-if="openSettings || (getSearch.open && !isSubreddits())" class="o-nav-sub">
      <div v-if="!getSearch.open" class="o-nav-sub__group fadeIn">
        <news-order />
      </div>

      <!-- Time settings -->
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

      <!-- Layout -->
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

      <!-- Pagination -->
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
import draggable from 'vuedraggable'
import type { Subreddit } from '@/types/state'

export default defineComponent({
  components: { draggable, newsOrder, search },
  data() {
    return {
      openMenu: false,
      openSettings: false,
      limits: LIMITS,
      layouts: LAYOUTS,
      times: TIMES,
      drag: false
    }
  },
  computed: {
    ...mapGetters([
      'getCurrentSub',
      'getLayout',
      'getLimit',
      'getQuery',
      'getSearch',
      'getSubreddits'
    ]),
    subreddits: {
      get() {
        return store.state.subreddits
      },
      set(subreddits: Subreddit[]) {
        store.dispatch('updateSubs', subreddits)
      }
    }
  },
  methods: {
    ...mapActions([
      'changeLayout',
      'changeLimit',
      'changeSearch',
      'changeSearchOpen',
      'changeSearchTime',
      'changeSub',
      'removeSub'
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
      this.openMenu = false
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
    }
  }
})
</script>
