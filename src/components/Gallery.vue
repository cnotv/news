<template>
  <article class="o-gallery__item" v-if="post.data.preview">
    <header>
      <h6>{{ post.data.title | truncate(150) }}</h6>
    </header>

    <section
      v-if="post.data.preview"
      v-bind:style="style"
      v-on:click="toggleModal(post.data.url)"
    >
      <a :href="post.data.url" target="_blank">
        <img
          v-if="post.data.preview.images[0].variants.gif"
          v-lazy="
            post.data.preview.images[0].variants.gif.source.url.replace(
              'amp;s',
              's'
            )
          "
        />
        <img
          v-else-if="post.data.preview"
          v-lazy="
            post.data.preview.images[0].source.url.replace('amp;s', 's')
          "
        />
      </a>
    </section>

    <footer>
      <span v-if="post.data.ups">
        <i class="fa fa-arrow-up"></i>
        {{ post.data.ups }}
      </span>
      <a
        :href="'http://www.reddit.com' + post.data.permalink"
        target="_blank"
      >
        <i class="fa fa-comment"></i>
      </a>
      <small>{{ post.data.created_utc | date }}</small>
      <a href="#" class="c-btn-alt" v-on:click="addSub(post.data.subreddit)"
        >/r/{{ post.data.subreddit }}</a
      >
    </footer>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Gallery",
  props: ["post"],
  data() {
    return {
      style: {
        minHeight: !post.data.preview
          ? 0
          : (post.data.preview.images[0].source.height /
              post.data.preview.images[0].source.width) *
              30 +
            "vw"
      }
    };
  }
});
</script>
