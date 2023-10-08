<template>
  <video
    v-if="data.secure_media?.reddit_video"
    :poster="data.preview?.images[0].source.url"
    preload="auto"
    autoplay="true"
    muted="true"
    loop="true"
    webkit-playsinline=""
    style="width: 100%; max-width: 100%; height: auto; max-height: 100vh"
  >
    <source :src="data.secure_media.reddit_video.fallback_url" type="video/mp4" />
  </video>

  <img
    v-else-if="data.preview?.images[0].variants.gif"
    v-lazy="data.preview.images[0].variants.gif.source.url.replace('amp;s', 's')"
    class="o-card__header__image--gif"
  />

  <img
    v-else-if="data.preview"
    :src="
      data.preview.images[0].source.url
        .replace('amp;s', 's')
        .replace('https://preview.redd.it/', 'https://i.redd.it/')
    "
    class="o-card__header__image--preview"
  />
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { RedditPost } from '@/types/reddit-posts'

  export default defineComponent({
    name: 'ImagePreview',
    props: {
      data: {
        type: Object as PropType<RedditPost>,
        default: () => ({}),
      },
    },
  })
</script>
