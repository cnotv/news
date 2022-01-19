<template>
  <article
    v-if="post.data"
    class="o-paper__wrap"
    :class="[post.data.selftext ? 'o-paper--desc' : '', post.data.preview ? 'o-paper--pic' : '']"
  >
    <header>
      <a :href="post.data.url" target="_blank">
        <h3>{{ truncate(post.data.title, 100) }}</h3>
      </a>
    </header>

    <section>
      <template v-if="post.data.preview">
        <img
          v-if="post.data.preview.images[0].variants.gif"
          v-lazy="post.data.preview.images[0].variants.gif.source.url.replace('amp;s', 's')"
        />
        <img
          v-else-if="post.data.preview"
          v-lazy="post.data.preview.images[0].source.url.replace('amp;s', 's')"
        />
      </template>

      <div v-if="post.data.selftext">
        {{ truncate(post.data.selftext, 400) }}
      </div>
    </section>

    <footer>
      {{ post.data.domain }}
    </footer>
  </article>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mixins } from '@/mixins'

  export default defineComponent({
    name: 'Paper',
    mixins: [mixins],
    props: ['post'],
  })
</script>
