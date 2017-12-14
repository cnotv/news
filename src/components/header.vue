<template>

  <header
    class="c-section"
    v-bind:class="{ 'has-menu-open' : menuOpen, 'has-search-open' : searchOpen,  }"
  >
    <div class="c-container-full">
      <nav class="o-nav-h">

        <ul
          class="o-nav-h__left"
          v-on:click="openMenu"
        >
          <li v-for="subreddit in getSubreddits">
            <a v-on:click="changeSub(subreddit)">{{ subreddit }}</a>
          </li>
        </ul>

        <search v-if="searchOpen"></search>

        <div class="o-nav-h__right">
          <a 
            class="js-burger o-nav-h__burger"
            v-on:click="openMenu"
          ><i class="fa fa-navicon"></i></a>

          <news-order v-if="!searchOpen"/>

          <button
            class="js-search o-search__toggle"
            v-on:click="openSearch"
          ><i class="fa"></i></button>
        </div>

      </nav>

      <div class="o-nav-min">
        <span>Posts:</span>
        <button
          v-for="limit in getLimits"
          v-on:click="changeLimit(limit)"
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
      menuOpen: false,
      searchOpen: false
    }
  },
  components: { newsOrder, search },
  computed: {
    ...mapGetters([
      'getSubreddits',
      'getLimits'
    ])
  },
  methods: {
    ...mapActions([
      'changeSub',
      'changeLimit',
      'changeSearch'
    ]),
    openMenu () {
      this.menuOpen = !this.menuOpen
    },
    openSearch () {
      this.searchOpen = !this.searchOpen
      this.$store.dispatch('changeSearch', '')
    }
  }
}
</script>