<template>

  <header class="c-section">
    <div class="c-container-full">
      <nav class="o-nav-h">

        <ul class="o-nav-h__left">
          <li v-for="subreddit in getSubreddits">
            <a v-on:click="changeSub(subreddit)">{{ subreddit }}</a>
          </li>
        </ul>

        <div class="o-search__bar">
          <!-- <search></search> -->
        </div>

        <div class="o-nav-h__right">
          <a class="js-burger o-nav-h__burger" type="button"><i class="fa fa-navicon"></i></a>
          <!-- <a class="js-search o-search__toggle"><i class="fa"></i></a> -->
          <news-order/>
        </div>

      </nav>
    </div>
  </header>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import newsOrder from '@/components/order'

export default {
  components: { newsOrder },
  mounted () {
  },
  computed: {
    ...mapGetters([
      'getSubreddits'
    ])
  },
  methods: {
    ...mapActions([
      'changeSub'
    ])
  }
}
</script>