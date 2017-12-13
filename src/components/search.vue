<template>
  <section>
    <input 
      class="js-search-field"
      placeholder="Type something.."
      v-model="search"
    >
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'search',
  methods: {
    ...mapActions([
      'changeSearch'
    ])
  },
  computed: {
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