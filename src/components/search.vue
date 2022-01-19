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
import {defineComponent} from "vue";
import { mapGetters, mapActions } from "vuex";
import { store } from "@/store";

export default defineComponent({
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
        return store.state.search.string;
      },
      set(value: string): void {
        if (this.$route.name === "home") {
          store.dispatch("changeSearch", value);
        } else {
          store.dispatch("commitSubreddits", value);
        }
      }
    },
    searchGlobal: {
      get(): boolean {
        return store.state.search.global;
      },
      set(value: string): void {
        store.dispatch("changeSearchGlobal");
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
