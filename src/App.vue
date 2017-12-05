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

Vue.use(Vuex)

export default {
  name: 'app',
  components: { newsHeader },
  store
}
</script>

<style lang="scss" src="./assets/styles/main.scss"></style>
