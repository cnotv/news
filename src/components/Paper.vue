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
        <img
          v-if="data.preview.images[0].variants.gif"
          v-lazy="data.preview.images[0].variants.gif.source.url.replace('amp;s', 's')"
        />
        <img
          v-else-if="data.preview"
          v-lazy="data.preview.images[0].source.url.replace('amp;s', 's')"
        />
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
  import { defineComponent, PropType } from 'vue'
  import { mixins } from '@/mixins'
  import { RedditPost } from '@/types/reddit-posts'

  export default defineComponent({
    name: 'Paper',
    mixins: [mixins],
    props: {
      data: {
        type: Object as PropType<RedditPost>,
        default: () => null,
      },
    },
  })
</script>
