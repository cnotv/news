<template>
  <select v-model="select" class="c-input__select c-order">
    <option v-for="sort in sorting" :key="sort">{{ sort }}</option>
  </select>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mapGetters, mapActions } from 'vuex'
  import { store } from '@/store'
  import { SORTING } from '@/data/settings'

  export default defineComponent({
    data() {
      return {
        sorting: SORTING,
      }
    },

    computed: {
      ...mapGetters(['getSort']),
      select: {
        get(): string {
          return store.state.settings[store.state.currentSub || 'default'].sort
        },
        set(value: string): void {
          store.dispatch('changeOrder', value)
        },
      },
    },

    methods: {
      ...mapActions(['changeOrder']),
    },
  })
</script>

<style>
  .c-order {
    margin-right: 24px;
    padding-right: 24px;
  }
</style>
