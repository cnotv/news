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
