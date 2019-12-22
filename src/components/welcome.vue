<template>
  <section class="c-container-s">
    <header>
      <hgroup>
        <img class="logo" src="./../assets/logo.svg" alt="cnotv news" />
        <h1 class="title">cnotv news</h1>
      </hgroup>
      <h5>Welcome! Here you can easily access to multiple format of news.</h5>
    </header>

    <p>
      Try to
      <b v-on:click="changeSearchOpen()">search some news or topic</b> you are
      interested about.<br />
      I would recomends these topics to give you an idea of what you can do:
    </p>

    <button
      class="c-btn-alt"
      v-for="sub in suggestions"
      href="#"
      v-bind:key="sub"
      v-on:click="addSub(sub)"
    >
      + {{ sub }}
    </button>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Welcome",
  data() {
    return {
      suggestions: [
        "worldnews",
        "technology",
        "art",
        "mechanical_gifs",
        "futurology",
        "redditdev"
      ]
    };
  },
  methods: {
    ...mapActions(["changeSearchOpen"])
  }
};
</script>

<style lang="scss" scoped>
$mobile: 560px;

hgroup {
  display: flex;
  @media (max-width: $mobile) {
    height: 100px;
    margin-bottom: 1.5rem;
  }
}
.logo {
  @media (max-width: $mobile) {
    width: 100px;
  }
}
.title {
  font-size: 6rem;
  line-height: 1;
  font-weight: 700;
  margin-left: 1rem;
  @media (max-width: $mobile) {
    font-size: 3rem;
  }
}
button {
  margin: 0 1rem 1rem 0;
}
</style>
