<template>
  <article>
    <a 
      :href="this.post.data.url"
      target="_blank"
    >
      <b>{{this.post.data.title}}</b>
      <small>
        <a
          href="#"
          v-on:click="addSub(this.post.data.subreddit)"
        >/r/{{this.post.data.subreddit}}
        </a>
          - 
          {{this.post.data.created_utc | date}}
        <a 
          :href="'http://www.reddit.com' + this.post.data.permalink"
          target="_blank"
        >
          <i class="fa fa-comment"></i>
        </a>
      </small>
    </a>
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
  },
  filters: {
    date: (value) => {
      let newDate = new Date(value * 1000)
      return newDate.toLocaleDateString('en-GB')
    }
  }
}
</script>
<style scoped>
</style>