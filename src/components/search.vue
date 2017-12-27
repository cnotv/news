<template>
  <div class="o-search__bar fadeIn">
    <input
      ref="search"
      class="js-search-field"
      placeholder="Type something.. or select a topic"
      v-model="search"
    >
    <button
      v-on:click="changeSearchGlobal"
      v-bind:class="{ 'is-active' : getSearchGlobal}"
      v-if="getSearchSub"
    >
      <span v-if="getSearchGlobal">All</span>
      <span v-if="!getSearchGlobal && getCurrentSub">{{getCurrentSub}}</span>
    </button>

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
    }
  }
}
</script>