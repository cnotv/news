<template>
  <article v-if="post.data.preview" class="o-gallery__item">
    <header>
      <h6>{{ truncate(post.data.title, 150) }}</h6>
    </header>

    <section v-if="post.data.preview" :style="style">
      <a :href="post.data.url" target="_blank">
        <img
          v-if="post.data.preview.images[0].variants.gif"
          v-lazy="post.data.preview.images[0].variants.gif.source.url.replace('amp;s', 's')"
        />
        <img
          v-else-if="post.data.preview"
          v-lazy="post.data.preview.images[0].source.url.replace('amp;s', 's')"
        />
      </a>
    </section>

    <footer>
      <span v-if="post.data.ups">
        <i class="fa fa-arrow-up"></i>
        {{ post.data.ups }}
      </span>
      <a :href="'http://www.reddit.com' + post.data.permalink" target="_blank">
        <i class="fa fa-comment"></i>
      </a>
      <small>{{ date(post.data.created_utc) }}</small>
      <a href="#" class="c-btn-alt" @click="addSub(post.data.subreddit)"
        >/r/{{ post.data.subreddit }}</a
      >
    </footer>
  </article>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mixins } from '@/mixins'

  export default defineComponent({
    name: 'Gallery',
    mixins: [mixins],
    props: ['post'],
    data() {
      return {
        style: {
          minHeight: !this.post.data.preview
            ? 0
            : (this.post.data.preview.images[0].source.height /
                this.post.data.preview.images[0].source.width) *
                30 +
              'vw',
        },
      }
    },
  })
</script>
