<template>
  <article 
  >
    <a 
      :href="this.post.data.url"
      target="_blank"
    >
      <div class="o-card__wrap">
        <header
          class="o-card__header"
          v-if="this.post.data.domain =='youtube.com' || this.post.data.domain =='youtu.be'"
          v-on:click="toggleModal(this.post.data.url)"
        >
          <iframe  width="100%" :src="this.post.data.url | embed" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
        </header>
        <header
          class="o-card__header"
          v-else-if="this.post.data.preview"
          v-on:click="toggleModal(this.post.data.url)"
        >
          <img v-lazy="this.post.data.preview.images[0].variants.gif.source.url" v-if="this.post.data.preview.images[0].variants.gif" />
          <img v-lazy="this.post.data.preview.images[0].source.url" v-else="this.post.data.preview" />
        </header>

        <section>
          <h6>{{ this.post.data.title | truncate(150) }}</h6>
        </section>

        <section v-if="this.post.data.selftext">
          <div>{{this.post.data.selftext | truncate(200)}}</div>
        </section>

        <footer>
          <span>
            <a
              href="#"
              class="c-btn-alt"
              v-on:click="addSub(post.data.subreddit)"
            >
              {{this.post.data.subreddit}}
            </a>
            {{this.post.data.created_utc | date}}
          </span>
          <a 
            :href="'http://www.reddit.com' + this.post.data.permalink"
            target="_blank"
          >
            <i class="fa fa-comment"></i>
          </a>
          <span v-if="this.post.data.ups">
            <i class="fa fa-arrow-up"></i>
            {{this.post.data.ups}}
          </span>
        </footer>

      </div>
    </a>
  </article>
</template>

<script>
export default {
  name: 'Card',
  props: ['post'],
  data () {
    return {
    }
  }
}
</script>