<template>
  <article
    v-if="data"
    class="o-paper__wrap"
    :class="[data.selftext ? 'o-paper--desc' : '', data.preview ? 'o-paper--pic' : '']"
  >
    <header>
      <a :href="data.url" target="_blank">
        <h3>{{ truncate(data.title, 100) }}</h3>
      </a>
    </header>

    <section>
      <template v-if="data.preview">
        <ImagePreview :data="data" />
      </template>

      <div v-if="data.selftext">
        {{ truncate(data.selftext, 400) }}
      </div>
    </section>

    <footer>
      {{ data.domain }}
    </footer>
  </article>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { mixins } from '@/mixins'
import ImagePreview from '@/components/ImagePreview.vue'
import type { RedditPost } from '@/types/reddit-posts';

export default defineComponent({
  name: 'Paper',
  components: { ImagePreview },
  mixins: [mixins],
  props: {
    data: {
      type: Object as PropType<RedditPost>,
      default: () => null
    }
  }
})
</script>
