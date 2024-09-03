<template>
  <article v-if="data.preview" class="o-gallery__item">
    <header>
      <h6>{{ truncate(data.title, 150) }}</h6>
    </header>

    <section>
      <a :href="data.url" target="_blank">
        <ImagePreview v-if="data.preview" :data="data" />
      </a>
    </section>

    <footer>
      <span v-if="data.ups">
        <i class="fa fa-arrow-up"></i>
        {{ data.ups }}
      </span>
      <a :href="'http://www.reddit.com' + data.permalink" target="_blank">
        <i class="fa fa-comment"></i>
      </a>
      <small>{{ date(data.created_utc) }}</small>
      <a
        v-if="search.global && getSearch.open"
        href="#"
        class="c-btn-alt"
        @click="addSub(data.subreddit)"
        >/r/{{ data.subreddit }}</a
      >
    </footer>
  </article>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { mixins } from '@/mixins'
import ImagePreview from '@/components/ImagePreview.vue'
import { mapGetters, mapState } from 'vuex'
import type { RedditPost } from '@/types/reddit-posts';

export default defineComponent({
  name: 'Gallery',
  components: { ImagePreview },
  mixins: [mixins],
  props: {
    data: {
      type: Object as PropType<RedditPost>,
      default: () => null
    }
  },
  computed: {
    ...mapGetters(['getSearch']),
    ...mapState(['search'])
  }
})
</script>
