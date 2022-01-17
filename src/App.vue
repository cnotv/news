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
import "./filters";

export default defineComponent({
  name: "app",
  components: { newsHeader },
  store
});
</script>

<style lang="scss" src="./assets/styles/main.scss"></style>
