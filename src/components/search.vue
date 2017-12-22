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
    >
      <span v-if="getSearchGlobal">All</span>
      <span v-if="!getSearchGlobal">{{getCurrentSub}}</span>
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'search',
  methods: {
    ...mapActions([
      'changeSearch',
      'changeSearchGlobal'
    ])
  },
  mounted () {
    this.$refs.search.focus()
  },
  computed: {
    ...mapGetters([
      'getSearchGlobal',
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