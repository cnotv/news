<template>

  <header class="c-section">
    <div class="c-container-full">
      <nav class="o-nav-h">

        <ul class="o-nav-h__left">
          <li v-for="subreddit in subreddits">
            <a v-on:click="changeCurrent(subreddit)">{{ subreddit }}</a>
          </li>
        </ul>

        <div class="o-search__bar">
          <!-- <search></search> -->
        </div>

        <div class="o-nav-h__right">
          <a class="js-burger o-nav-h__burger" type="button"><i class="fa fa-navicon"></i></a>
          <!-- <a class="js-search o-search__toggle"><i class="fa"></i></a> -->
        </div>

      </nav>
    </div>
  </header>

</template>

<script>
import Vuex from 'vuex'

export default {
  computed: {
    ...Vuex.mapGetters([
      'changeCurrent',
      'getData'
    ]),
    ...Vuex.mapState([
      'subreddits',
      'currentSub'
    ])
  },
  methods: {
  }
}
</script>