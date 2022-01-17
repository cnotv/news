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
        >
          <iframe
            width="100%"
            :src="`${embed(post.data.url)}`"
            frameborder="0"
            gesture="media"
            allow="encrypted-media"
            allowfullscreen
          ></iframe>
        </header>

        <header
          class="o-card__header"
          v-else-if="post.data.preview"
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
          <h6>{{ truncate(post.data.title, 150) }}</h6>
        </section>

        <section v-if="post.data.selftext">
          <div>{{ truncate(post.data.selftext, 200) }}</div>
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
            {{ date(post.data.created_utc) }}
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
import { mixins } from "@/mixins";

export default defineComponent({
  name: "Card",
  props: ["post"],
  mixins: [mixins]
});
</script>
