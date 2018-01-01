<template>
  <article
    class="o-gallery__item"
    v-if="this.post.data.preview"
  >
    <a 
      :href="this.post.data.url"
      target="_blank"
    >

      <header>
        <h6>{{ this.post.data.title | truncate(150) }}</h6>
      </header>

      <section
        v-if="this.post.data.preview"
        v-on:click="toggleModal(this.post.data.url)"
      >
        <img v-lazy="this.post.data.preview.images[0].variants.gif.source.url" v-if="this.post.data.preview.images[0].variants.gif" />
        <img v-lazy="this.post.data.preview.images[0].source.url" v-else="this.post.data.preview" />
      </section>

      <footer>
        <span v-if="this.post.data.ups">
          <i class="fa fa-arrow-up"></i>
          {{this.post.data.ups}}
        </span>
        <a 
          :href="'http://www.reddit.com' + this.post.data.permalink"
          target="_blank"
        >
          <i class="fa fa-comment"></i>
        </a>
        <small>
          {{this.post.data.created_utc | date}}
        </small>
        <a
          href="#"
          class="c-btn-alt"
          v-on:click="addSub(post.data.subreddit)"
        >/r/{{this.post.data.subreddit}}
        </a>
      </footer>

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