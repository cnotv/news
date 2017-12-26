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
          v-on:click="toggleSearch"
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

          <news-order v-if="!getSearchOpen && !openSettings"/>

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

      <nav class="o-nav-min">
        <div
          class="o-nav-min__group fadeIn"
          v-if="getSearchOpen"
        >
          <span>View post till:</span>
          <button
            class="c-btn-alt"
            v-on:click="changeSearchTime('')"
            v-bind:class="{'is-active' : '' === getSearchTimeCurrent}"
          >None</button>
          <button
            class="c-btn-alt"
            v-for="time in getSearchTime"
            v-on:click="changeSearchTime(time)"
            v-bind:class="{'is-active' : time === getSearchTimeCurrent}"
          >{{ time }} </button>
        </div>

        <div class="o-nav-min__group fadeIn">
          <span>Columns:</span>
          <button
            class="c-btn-alt"
            v-for="layout in getLayout"
            v-on:click="changeLayout(layout)"
            v-bind:class="{'is-active' : layout === getCurrentLayout}"
          >{{ layout }} </button>
        </div>

        <div class="o-nav-min__group">
          <span>Posts:</span>
          <button
            class="c-btn-alt"
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
      this.$store.dispatch('changeSearchOpen')
      this.$store.dispatch('changeSearch', '')
    },
    resetSettings () {
      localStorage.clear()
      location.reload()
    }
  }
}
</script>