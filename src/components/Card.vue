<template>
  <article class="c-col-1-4 o-card o-card--hidden-footer">
    <a :href="data.url" target="_blank">
      <div class="o-card__wrap">
        <header
          v-if="data.domain == 'youtube.com' || data.domain == 'youtu.be'"
          class="o-card__header"
        >
          <iframe
            width="100%"
            :src="`${embed(data.url)}`"
            frameborder="0"
            gesture="media"
            allow="encrypted-media"
            allowfullscreen
          ></iframe>
        </header>

        <header v-else-if="data.preview" class="o-card__header">
          <img
            v-if="data.preview.images[0].variants.gif"
            v-lazy="data.preview.images[0].variants.gif.source.url.replace('amp;s', 's')"
          />
          <img
            v-else-if="data.preview"
            v-lazy="data.preview.images[0].source.url.replace('amp;s', 's')"
          />
        </header>

        <section>
          <h6>{{ truncate(data.title, 150) }}</h6>
        </section>

        <section v-if="data.selftext">
          <div>{{ truncate(data.selftext, 200) }}</div>
        </section>

        <footer>
          <span v-if="data.ups">
            <i class="fa fa-arrow-up"></i>
            {{ data.ups }}
          </span>
          <a :href="'http://www.reddit.com' + data.permalink" target="_blank">
            <i class="fa fa-comment"></i>
          </a>
          <small>
            {{ date(data.created_utc) }}
          </small>
          <a href="#" class="c-btn-alt" @click="addSub(data.subreddit)">/r/{{ data.subreddit }} </a>
        </footer>
      </div>
    </a>
  </article>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { mixins } from '@/mixins'
  import { RedditPost } from '@/types/reddit-posts'

  export default defineComponent({
    name: 'Card',
    mixins: [mixins],
    props: {
      data: {
        type: Object as PropType<RedditPost>,
        default: () => null,
      },
    },
  })
</script>
