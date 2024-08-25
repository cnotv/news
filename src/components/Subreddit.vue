<template>
  <section class="c-col" @click="addSub(data.name)">
    <div class="o-sub">
      <button class="c-btn-icon">
        <i class="fa fa-plus"></i>
      </button>
      <div>
        <h1 class="c-h1">/r/{{ data.name }} - {{ data.title }}</h1>
        <h5>{{ data.description }}</h5>
        <span><i class="fa fa-user"></i> {{ data.subscribers }}</span>
        <span v-if="data.categories"> - {{ data.categories }}</span>
      </div>
    </div>
    <hr />
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { mixins } from '@/mixins'

export default defineComponent({
  name: 'Subreddit',
  mixins: [mixins],
  props: {
    data: {
      type: Object as PropType<SubredditsIndex>,
      default: () => ({})
    }
  }
})
</script>

<style scoped>
.c-h1 {
  font-weight: bold;
  font-size: 3vh;
}

.o-sub {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}
</style>
