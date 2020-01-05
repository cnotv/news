<template>
  <section class="c-col">
    <h1 class="c-h1">{{ post.title }}</h1>
    <h2>{{ post.publicDescription }}</h2>

    <span>{{ post.subscribers }}</span>
    <button class="c-btn-alt" v-on:click="addSub(post.name)">
      /r/ {{ post.name }}
    </button>
  </section>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Subreddit",
  props: ["post"]
});
</script>

<style scoped>
.c-h1 {
  font-weight: bold;
  font-size: 3vh;
}
</style>
