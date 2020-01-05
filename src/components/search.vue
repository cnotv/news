<template>
  <div class="o-search__bar fadeIn">
    <input ref="search" placeholder="Type something.." v-model="search" />
    <div class="c-filter">
      <input type="checkbox" id="search-global" v-model="searchGlobal" />
      <label for="search-global"></label>
    </div>

    <button
      class="o-nav-h__action"
      v-bind:class="{ 'is-active': !getSearch.sub }"
      v-on:click="changeSearchSub"
    >
      /r/
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";

export default Vue.extend({
  name: "search",
  methods: {
    ...mapActions(["changeSearch", "changeSearchSub", "changeSearchGlobal"])
  },
  mounted() {
    (this.$refs.search as HTMLElement).focus();
  },
  computed: {
    ...mapGetters(["getSearch"]),
    search: {
      get(): string {
        return this.$store.state.search.string;
      },
      set(value: string): void {
        this.$store.dispatch("changeSearch", value);
      }
    },
    searchGlobal: {
      get(): string {
        return this.$store.state.search.global;
      },
      set(value: string): void {
        this.$store.dispatch("changeSearchGlobal");
      }
    }
  }
});
</script>

<style scoped>
.c-filter {
  flex-shrink: 0;
}
</style>
