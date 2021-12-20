<template>
  <article class="c-col-1-4 o-card o-card--hidden-footer">
    <a :href="post.data.url" target="_blank">
      <div class="o-card__wrap">
        <header
          class="o-card__header"
          v-if="
            post.data.domain == 'youtube.com' ||
              post.data.domain == 'youtu.be'
          "
          v-on:click="toggleModal(post.data.url)"
        >
          <iframe
            width="100%"
            :src="post.data.url | embed"
            frameborder="0"
            gesture="media"
            allow="encrypted-media"
            allowfullscreen
          ></iframe>
        </header>

        <header
          class="o-card__header"
          v-else-if="post.data.preview"
          v-on:click="toggleModal(post.data.url)"
        >
          <img
            v-if="post.data.preview.images[0].variants.gif"
            v-lazy="
              post.data.preview.images[0].variants.gif.source.url.replace(
                'amp;s',
                's'
              )
            "
          />
          <img
            v-else-if="post.data.preview"
            v-lazy="
              post.data.preview.images[0].source.url.replace('amp;s', 's')
            "
          />
        </header>

        <section>
          <h6>{{ post.data.title | truncate(150) }}</h6>
        </section>

        <section v-if="post.data.selftext">
          <div>{{ post.data.selftext | truncate(200) }}</div>
        </section>

        <footer>
          <span v-if="post.data.ups">
            <i class="fa fa-arrow-up"></i>
            {{ post.data.ups }}
          </span>
          <a
            :href="'http://www.reddit.com' + post.data.permalink"
            target="_blank"
          >
            <i class="fa fa-comment"></i>
          </a>
          <small>
            {{ post.data.created_utc | date }}
          </small>
          <a href="#" class="c-btn-alt" v-on:click="addSub(post.data.subreddit)"
            >/r/{{ post.data.subreddit }}
          </a>
        </footer>
      </div>
    </a>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Card",
  props: ["post"]
});
</script>
