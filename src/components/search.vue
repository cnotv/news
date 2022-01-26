<template>
  <div class="o-search__bar fadeIn">
    <input ref="search" v-model="search" placeholder="Type something.." />
    <div v-if="$route.name !== 'subreddits'" class="c-filter">
      <input id="search-global" v-model="searchGlobal" type="checkbox" />
      <label for="search-global"></label>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mapGetters, mapActions } from 'vuex'
  import { store } from '@/store'

  export default defineComponent({
    name: 'Search',
    computed: {
      ...mapGetters(['getSearch']),
      search: {
        get(): string {
          return store.state.search.string
        },
        set(value: string): void {
          if (this.$route.name === 'home') {
            store.dispatch('changeSearch', value)
          } else {
            store.dispatch('commitSubreddits', value)
          }
        },
      },
      searchGlobal: {
        get(): boolean {
          return store.state.search.global
        },
        set(): void {
          store.dispatch('changeSearchGlobal')
        },
      },
    },
    mounted() {
      ;(this.$refs.search as HTMLElement).focus()
    },
    methods: {
      ...mapActions(['changeSearch', 'changeSearchGlobal']),
    },
  })
</script>

<style scoped>
  .c-filter {
    flex-shrink: 0;
  }
</style>
