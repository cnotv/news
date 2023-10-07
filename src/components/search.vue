<template>
  <div class="o-search__bar fadeIn">
    <input ref="input" v-model="search" placeholder="Type something.." />
    <div v-if="$route.name !== 'subreddits'" class="c-filter">
      <input id="search-global" v-model="searchGlobal" type="checkbox" />
      <label for="search-global"></label>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import { store } from '@/store'
  import { debounce } from 'lodash'
  import { useRoute } from 'vue-router'

  const input = ref()
  const route = useRoute()
  const search = computed({
    get(): string {
      return store.state.search.string
    },
    set: debounce((value: string) => {
      // TODO: Investigate why this starts on first load
      if (typeof value === 'string') {
        if (route.name === 'home') {
          store.dispatch('changeSearch', value)
        } else {
          store.dispatch('commitSubreddits', value)
        }
      }
    }, 500),
  })
  const searchGlobal = computed({
    get(): boolean {
      return store.state.search.global
    },
    set(): void {
      store.dispatch('changeSearchGlobal')
    },
  })

  onMounted(() => {
    input.value.focus()
  })
</script>

<style scoped lang="scss">
  .c-filter {
    flex-shrink: 0;
  }

  .o-search__bar {
    input {
      font-size: 1.2rem;
      color: var(--color-text);
    }
  }
</style>
