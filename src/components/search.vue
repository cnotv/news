<template>
  <div class="o-search__bar fadeIn">
    <input
      ref="search"
      placeholder="Type something.."
      v-model="search"
    >
    <div class="c-filter">
      <input
        type="checkbox"
        id="search-global"
        v-model="searchGlobal"
      >
      <label for="search-global">Global?</label>
    </div>

    <button
      v-bind:class="{ 'is-active' : !getSearchSub}"
      v-on:click="changeSearchSub"
    >/r/</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'search',
  methods: {
    ...mapActions([
      'changeSearch',
      'changeSearchSub',
      'changeSearchGlobal'
    ])
  },
  mounted () {
    this.$refs.search.focus()
  },
  computed: {
    ...mapGetters([
      'getSearchGlobal',
      'getSearchSub',
      'getCurrentSub'
    ]),
    search: {
      get () {
        return this.$store.state.search
      },
      set (value) {
        this.$store.dispatch('changeSearch', value)
      }
    },
    searchGlobal: {
      get () {
        return this.$store.state.searchGlobal
      },
      set (value) {
        this.$store.dispatch('changeSearchGlobal', value)
      }
    }
  }
}
</script>
<style scoped>
.c-filter {
  flex-shrink: 0;
}
</style>