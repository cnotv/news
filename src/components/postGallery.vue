<template>
  <article
    v-if="this.post.data.preview"
  >
    <a 
      :href="this.post.data.url"
      target="_blank"
    >
      <section
        v-if="this.post.data.preview"
        v-on:click="toggleModal(this.post.data.url)"
      >
        <img v-lazy="this.post.data.preview.images[0].variants.gif.source.url" v-if="this.post.data.preview.images[0].variants.gif" />
        <img v-lazy="this.post.data.preview.images[0].source.url" v-else="this.post.data.preview" />
      </section>
    </a>
  </article>
</template>

<script>
export default {
  name: 'Gallery',
  props: ['post'],
  data () {
    return {
    }
  }
}
</script>
<style scoped>
</style>