<template>
  <section class="c-section">
    <div class="c-container-full">

      <h1>{{ getCurrentSub }}</h1>
      <span>{{ getCurrentOrder }}</span>

      <ul>
        <li v-for="post in getPosts">
          <h2>{{ post.title }}</h2>
          <p>{{ post.excerpt }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import Vuex from 'vuex'

export default {
  computed: {
    ...Vuex.mapGetters([
      'getCurrentSub',
      'getCurrentOrder',
      'getPosts'
    ])
  }
}
</script>
