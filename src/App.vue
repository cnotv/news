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
import store from "@/store";
import Vue from "vue";
import Vuex from "vuex";
import VueLazyload from "vue-lazyload";
import { mapGetters, mapActions } from "vuex";

import "./filters";

import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn: "https://f908d5c000ea4ffa87f6484a4c286732@sentry.io/1472388",
  integrations: [
    new Integrations.BrowserTracing(),
    new VueIntegration({ Vue, attachProps: true, tracing: true })
  ],
  environment: process.env.NODE_ENV,
  release: process.env.VERSION
});

Vue.use(Vuex);

Vue.use(VueLazyload, {
  adapter: {
    loaded({
      bindType,
      el,
      naturalHeight,
      naturalWidth,
      $parent,
      src,
      loading,
      error,
      Init
    }) {},
    loading(listender, Init) {},
    error(listender, Init) {}
  }
});

// Distribute to components using global mixin
Vue.mixin({
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
});

export default Vue.extend({
  name: "app",
  components: { newsHeader },
  store
});
</script>

<style lang="scss" src="./assets/styles/main.scss"></style>
