<template>
  <div class="o-search__bar fadeIn">
    <input ref="search" placeholder="Type something.." v-model="search" />
    <div class="c-filter" v-if="$route.name !== 'subreddits'">
      <input type="checkbox" id="search-global" v-model="searchGlobal" />
      <label for="search-global"></label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";

export default Vue.extend({
  name: "search",
  methods: {
    ...mapActions(["changeSearch", "changeSearchGlobal"])
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
        if (this.$route.name === "home") {
          this.$store.dispatch("changeSearch", value);
        } else {
          this.$store.dispatch("commitSubreddits", value);
        }
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
