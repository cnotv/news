<template>
  <section class="c-section">
    <div class="c-container-full">
      <section class="c-container-s">
        <header>
          <div class="welcome__header">
            <img class="c-logo" src="./../assets/logo.svg" alt="cnotv news" />
            <h1 class="c-h1">cnotv news</h1>
          </div>
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

        <p>
          Follow this project on
          <a
            rel="noopener noreferrer"
            href="https://github.com/cnotv/news/"
            target="_blank"
          ><b>Github</b></a>
        </p>
      </section>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapActions } from "vuex";

@Component({
  name: "Welcome",
  data() {
    return {
      suggestions: [
        "news",
        "worldnews",
        "hackernews",
        "futurology",
        "technology",
        "educationalgifs",
        "mechanical_gifs",
        "dataisbeautiful",
        "selfhosted",
        "cgnews",
        "pcgaming",
        "addons4kodi",
        "webdev",
        "programmerhumor",
        "redditdev"
      ]
    };
  },
  methods: {
    ...mapActions(["changeSearchOpen"])
  }
})
export default class Welcome extends Vue {}
</script>

<style lang="scss" scoped>
$mobile: 560px;

.welcome {
  &__header {
    display: flex;
    @media (max-width: $mobile) {
      height: 100px;
      margin-bottom: 1.5rem;
    }
  }
}

// TODO: Create component class
.c-logo {
  @media (max-width: $mobile) {
    width: 100px;
  }
}

// TODO: Create component class
.c-h1 {
  font-size: 6rem;
  line-height: 1;
  font-weight: 700;
  margin-left: 1rem;
  @media (max-width: $mobile) {
    font-size: 3rem;
  }
}

.c-btn-alt {
  margin: 0 1rem 1rem 0;
}
</style>
