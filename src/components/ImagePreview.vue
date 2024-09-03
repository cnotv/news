<template>
  <video
    v-if="data.secure_media?.reddit_video"
    ref="videoElement"
    :poster="data.preview?.images[0].source.url"
    preload="auto"
    loop="true"
    webkit-playsinline=""
    controls
  >
    <source :src="data.secure_media.reddit_video.fallback_url" type="video/mp4" />
  </video>

  <video
    v-else-if="data.preview?.reddit_video_preview?.fallback_url"
    ref="videoElement"
    :poster="data.preview?.images[0].source.url"
    preload="auto"
    loop="true"
    webkit-playsinline=""
    controls
  >
    <source :src="data.preview?.reddit_video_preview?.fallback_url" type="video/mp4" />
  </video>

  <img v-else-if="data.preview?.images[0].variants.gif" class="o-card__header__image--gif" />

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
import type { RedditPost } from '@/types/reddit-posts';
import { defineComponent, onMounted, ref, type PropType } from 'vue'

export default defineComponent({
  name: 'ImagePreview',
  props: {
    data: {
      type: Object as PropType<RedditPost>,
      default: () => ({})
    }
  },
  setup() {
    const videoElement = ref(null as HTMLVideoElement | null)

    onMounted(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (videoElement.value) {
              if (entry.isIntersecting) {
                videoElement.value.play()
              } else {
                videoElement.value.pause()
              }
            }
          })
        },
        {
          threshold: 0.5 // Adjust this value as needed
        }
      )

      if (videoElement.value) {
        observer.observe(videoElement.value as Element)
      }
    })

    return { videoElement }
  }
})
</script>
