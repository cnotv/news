<template>
  <article>
    <header>
      <a 
        :href="this.post.data.url"
        target="_blank"
      >{{this.post.data.title}}
      </a>
    </header>

    <small>
      <button v-on:click="addSub(this.post.data.subreddit)">
        <i class="fa fa-plus"></i>
        /r/{{this.post.data.subreddit}}
      </button>
        - 
        <a :href="'//' + this.post.data.domain" target="_blank">{{this.post.data.domain}}</a>
        - 
        {{this.post.data.created_utc | date}}
      <a 
        :href="'http://www.reddit.com' + this.post.data.permalink"
        target="_blank"
      >
        <i class="fa fa-comment"></i>
      </a>
    </small>
    <hr>
  </article>
</template>

<script>
export default {
  name: 'List',
  props: ['post'],
  data () {
    return {
    }
  }
}
</script>
<style scoped>
header {
  font-weight: bold;
  font-size: 3vh;
}
button {
  background-color: transparent;
  border: 0;
  cursor: pointer;
}
</style>