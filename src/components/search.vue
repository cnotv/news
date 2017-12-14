<template>
    <div class="o-search__bar">
      <input 
        class="js-search-field"
        placeholder="Type something.."
        v-model="search"
      >
      <button v-on:click="changeSearchGlobal">
        <i class="fa fa-globe"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'search',
  methods: {
    ...mapActions([
      'changeSearch',
      'changeSearchGlobal'
    ])
  },
  computed: {
    search: {
      get () {
        return this.$store.state.search
      },
      set (value) {
        this.$store.dispatch('changeSearch', value, this.global)
      }
    }
  }
}
</script>