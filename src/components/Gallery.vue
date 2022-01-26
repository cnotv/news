<template>
  <article v-if="data.preview" class="o-gallery__item">
    <header>
      <h6>{{ truncate(data.title, 150) }}</h6>
    </header>

    <section v-if="data.preview" :style="style">
      <a :href="data.url" target="_blank">
        <img
          v-if="data.preview.images[0].variants.gif"
          v-lazy="data.preview.images[0].variants.gif.source.url.replace('amp;s', 's')"
        />
        <img
          v-else-if="data.preview"
          v-lazy="data.preview.images[0].source.url.replace('amp;s', 's')"
        />
      </a>
    </section>

    <footer>
      <span v-if="data.ups">
        <i class="fa fa-arrow-up"></i>
        {{ data.ups }}
      </span>
      <a :href="'http://www.reddit.com' + data.permalink" target="_blank">
        <i class="fa fa-comment"></i>
      </a>
      <small>{{ date(data.created_utc) }}</small>
      <a href="#" class="c-btn-alt" @click="addSub(data.subreddit)">/r/{{ data.subreddit }}</a>
    </footer>
  </article>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { mixins } from '@/mixins'
  import { RedditPost } from '@/types/reddit-posts'

  export default defineComponent({
    name: 'Gallery',
    mixins: [mixins],
    props: {
      data: {
        type: Object as PropType<RedditPost>,
        default: () => null,
      },
    },
    data() {
      return {
        style: {
          minHeight: !this.data.preview
            ? 0
            : (this.data.preview.images[0].source.height /
                this.data.preview.images[0].source.width) *
                30 +
              'vw',
        },
      }
    },
  })
</script>
