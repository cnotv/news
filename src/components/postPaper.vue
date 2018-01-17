<template>
  <article
    class="o-paper__wrap"
    v-bind:class="[
      this.post.data.selftext ? 'o-paper--desc' : '',
      this.post.data.preview ? 'o-paper--pic' : ''
    ]"
  >
    <header>
      <a 
        :href="this.post.data.url"
        target="_blank"
      >
        <h3>{{ this.post.data.title | truncate(100) }}</h3>
      </a>
    </header>


    <section>
      <template
        v-if="this.post.data.preview"
      >
        <img 
          v-if="this.post.data.preview.images[0].variants.gif"
          v-lazy="this.post.data.preview.images[0].variants.gif.source.url"
        />
        <img
          v-lazy="this.post.data.preview.images[0].source.url"
          v-else="this.post.data.preview"
        />
      </template>

      <div v-if="this.post.data.selftext">{{this.post.data.selftext | truncate(400)}}</div>
    </section>

    <footer>
      {{this.post.data.domain}}
    </footer>

  </article>
</template>

<script>
export default {
  name: 'Paper',
  props: ['post'],
  data () {
    return {
    }
  }
}
</script>
<style scoped>
</style>