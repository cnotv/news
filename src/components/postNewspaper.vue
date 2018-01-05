<template>
  <article
    class="o-newspaper__item"
  >
    <a 
      :href="this.post.data.url"
      target="_blank"
    >
      <header>
        <h3>{{ this.post.data.title}}</h3>
      </header>


      <section v-if="this.post.data.selftext">
        <figure
          v-if="this.post.data.preview"
          v-on:click="toggleModal(this.post.data.url)"
        >
          <img 
            v-if="this.post.data.preview.images[0].variants.gif"
            v-lazy="this.post.data.preview.images[0].variants.gif.source.url"
          />
          <img
            v-lazy="this.post.data.preview.images[0].source.url"
            v-else="this.post.data.preview"
          />
        </figure>

        <div>{{this.post.data.selftext | truncate(400)}}</div>
      </section>

      <footer>
        {{this.post.data.domain}}
      </footer>

    </a>
  </article>
</template>

<script>
export default {
  name: 'Newspaper',
  props: ['post'],
  data () {
    return {
    }
  }
}
</script>
<style scoped>
</style>