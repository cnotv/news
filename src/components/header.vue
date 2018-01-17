<template>

  <header
    class="c-section"
    v-bind:class="{ 'has-menu-open' : openMenu, 'has-search-open' : getSearchOpen }"
  >
    <div class="c-container-full">
      <nav class="o-nav-h">

        <ul
            v-if="getSubreddits.length > 0"
          class="o-nav-h__left fadeIn"
          v-on:click="toggleMenu"
        >
          <li
            v-for="subreddit in getSubreddits">
            <a
              v-if="openSettings"
              v-on:click="removeSub(subreddit)"
            >X {{ subreddit }}</a>
            <a
              v-if="!openSettings"
              v-bind:class="{'is-active' : subreddit == getCurrentSub}"
              v-on:click="changeSub(subreddit)"
            >{{ subreddit }}</a>
          </li>
        </ul>
        <a
          v-else-if="!getSearchOpen && !openSettings"
          v-on:click="toggleSearchTopic"
        >Add a topic</a>
        <span v-else></span>

        <search v-if="getSearchOpen"></search>

        <div class="o-nav-h__right">
          <a 
            class="o-nav-h__burger"
            v-on:click="toggleMenu"
          ><i class="fa fa-navicon"></i></a>

          <button
            class=""
            v-on:click="resetSettings"
            v-if="!getSearchOpen && openSettings"
          >Reset</button>

          <button
            class=""
            v-on:click="toggleSettings"
            v-if="!getSearchOpen"
            v-bind:class="{'is-active' : openSettings}"
          ><i class="fa fa-cog"></i></button>

          <button
            class="o-search__toggle"
            v-on:click="toggleSearch"
            v-bind:class="{'is-active' : getSearchOpen}"
          ><i class="fa"></i></button>
        </div>

      </nav>

      <nav
        v-if="getQuery !== ''"
        class="o-nav-alt"
      >
        <div
          class="o-nav-alt__group fadeIn"
          v-if="!getSearchOpen && !openSettings"
        >
          <news-order/>
        </div>

        <div
          class="o-nav-alt__group fadeIn"
          v-if="getSearchOpen"
        >
          <span class="o-nav-alt__label">View post till:</span>
          <button
            v-on:click="changeSearchTime('')"
            v-bind:class="{'is-active' : '' === getSearchTimeCurrent}"
          >None</button>
          <button
            v-for="time in getSearchTime"
            v-on:click="changeSearchTime(time)"
            v-bind:class="{'is-active' : time === getSearchTimeCurrent}"
          >{{ time }} </button>
        </div>

        <div class="o-nav-alt__group fadeIn">
          <span class="o-nav-alt__label">Layout:</span>
          <button
            v-for="layout in getLayout"
            v-on:click="changeLayout(layout)"
            v-bind:class="{'is-active' : layout === getCurrentLayout}"
          >
            <span
              v-if="layout === '1'"
              class="fa fa-list"></span>
            <span
              v-if="layout === '2'"
              class="fa fa-th"></span>
            <span
              v-if="layout === '3'"
              class="fa fa-newspaper-o"></span>
            <span
              v-if="layout === '4'"
              class="fa fa-picture-o"></span>
          </button>
        </div>

        <div class="o-nav-alt__group fadeIn">
          <span class="o-nav-alt__label">Posts:</span>
          <button
            v-for="limit in getLimits"
            v-on:click="changeLimit(limit)"
            v-bind:class="{'is-active' : limit === getCurrentLimit}"
          >{{ limit }}</button>
        </div>
      </nav>
    </div>
  </header>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import newsOrder from '@/components/order'
import search from '@/components/search'

export default {
  data () {
    return {
      openMenu: false,
      openSettings: false
    }
  },
  components: { newsOrder, search },
  computed: {
    ...mapGetters([
      'getSubreddits',
      'getLimits',
      'getQuery',
      'getCurrentSub',
      'getCurrentLimit',
      'getSearchOpen',
      'getSearchTime',
      'getSearchTimeCurrent',
      'getLayout',
      'getCurrentLayout'
    ])
  },
  methods: {
    ...mapActions([
      'changeSub',
      'changeLimit',
      'changeSearch',
      'removeSub',
      'changeSearchTime',
      'changeSearchSub',
      'changeSearchOpen',
      'changeLayout'
    ]),
    toggleMenu () {
      this.openMenu = !this.openMenu
      this.$store.dispatch('changeSearchOpen', true)
    },
    toggleSettings () {
      this.openSettings = !this.openSettings
      this.openMenu = true
    },
    toggleSearch () {
      this.openMenu = false
      this.openSettings = false
      this.$store.dispatch('changeSearchSub', true)
      this.$store.dispatch('changeSearchOpen')
      this.$store.dispatch('changeSearch', '')
    },
    resetSettings () {
      localStorage.clear()
      location.reload()
    },
    toggleSearchTopic () {
      this.toggleSearch()
      this.$store.dispatch('changeSearchSub', false)
    }
  }
}
</script>