<template>
  <div id="app">
    <news-header />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import newsHeader from "@/components/NewsHeader.vue";
import { store } from "@/store";
import { defineComponent } from "vue";
import { mapActions } from "vuex";

import "./filters";

// Distribute to components using global mixin
export const mixin = {
  methods: {
    ...mapActions(["addSub"])
  },
  filters: {
    /**
     * Truncate strings and append ellipsis
     */
    truncate: (string: string, value: string): string => {
      if (!value) return "";
      value = value.toString();
      let stringNew = string.toString();
      stringNew = stringNew.substring(0, +value);
      if (string.length > +value) {
        stringNew += "...";
      }
      return stringNew;
    },

    /**
     * Format date
     */
    date: (value: string): string => {
      let newDate = new Date(+value * 1000);
      return newDate.toLocaleDateString("en-GB");
    },

    /**
     * Convert youtube links to embed versions
     */
    embed: (url: string): string => {
      return url.replace("watch?v=", "embed/");
    }
  }
};

export default defineComponent({
  name: "app",
  components: { newsHeader },
  store
});
</script>

<style lang="scss" src="./assets/styles/main.scss"></style>
