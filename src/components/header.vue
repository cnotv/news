<template>

  <header
    class="c-section"
    v-bind:class="{ 'has-menu-open' : openMenu, 'has-search-open' : openSearch }"
  >
    <div class="c-container-full">
      <nav class="o-nav-h">

        <ul
          class="o-nav-h__left fadeIn"
          v-on:click="toggleMenu"
        >
          <li v-for="subreddit in getSubreddits">
            <a
              v-if="openSettings"
              v-on:click="removeSub(subreddit)"
            >X {{ subreddit }}</a>
            <a
              v-if="!openSettings"
              v-on:click="changeSub(subreddit)"
            >{{ subreddit }}</a>
          </li>
        </ul>

        <search v-if="openSearch"></search>

        <div class="o-nav-h__right">
          <a 
            class="o-nav-h__burger"
            v-on:click="toggleMenu"
          ><i class="fa fa-navicon"></i></a>

          <news-order v-if="!openSearch"/>

          <button
            class=""
            v-on:click="toggleSettings"
            v-if="!openSearch"
            v-bind:class="{'is-active' : openSettings}"
          ><i class="fa fa-cog"></i></button>

          <button
            class="o-search__toggle"
            v-on:click="toggleSearch"
            v-bind:class="{'is-active' : openSearch}"
          ><i class="fa"></i></button>
        </div>

      </nav>

      <div class="o-nav-min">
        <span>Posts:</span>
        <button
          class="c-btn-alt"
          v-for="limit in getLimits"
          v-on:click="changeLimit(limit), prevent"
          v-bind:class="{'is-active' : limit === getCurrentLimit}"
        >{{ limit }}</button>
      </div>
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
      openSettings: false,
      openSearch: false
    }
  },
  components: { newsOrder, search },
  computed: {
    ...mapGetters([
      'getSubreddits',
      'getLimits',
      'getCurrentLimit'
    ])
  },
  methods: {
    ...mapActions([
      'changeSub',
      'changeLimit',
      'changeSearch',
      'removeSub'
    ]),
    toggleMenu () {
      this.openMenu = !this.openMenu
      this.openSearch = false
    },
    toggleSettings () {
      this.openSettings = !this.openSettings
      this.openMenu = true
    },
    toggleSearch () {
      this.openMenu = false
      this.openSettings = false
      this.openSearch = !this.openSearch
      this.$store.dispatch('changeSearch', '')
    }
  }
}
</script>