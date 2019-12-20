<template>
  <div id="app">
    <news-header/>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import newsHeader from '@/components/header'
import store from '@/store'
import Vue from 'vue'
import Vuex from 'vuex'
import VueLazyload from 'vue-lazyload'

import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

Sentry.init({
  dsn: 'https://f908d5c000ea4ffa87f6484a4c286732@sentry.io/1472388',
  integrations: [new Integrations.Vue({Vue, attachProps: true})],
  environment: process.env.NODE_ENV,
  release: process.env.VERSION
})

Vue.use(Vuex)

Vue.use(VueLazyload, {
  adapter: {
    loaded ({ bindType, el, naturalHeight, naturalWidth, $parent, src, loading, error, Init }) {
    },
    loading (listender, Init) {
    },
    error (listender, Init) {
    }
  }
})

export default {
  name: 'app',
  components: { newsHeader },
  store
}
</script>

<style lang="scss" src="./assets/styles/main.scss"></style>
