<template>
  <aside
    class="o-modal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalLabel"
    aria-hidden="true"
  >
    <div class="o-modal__wrap fadeInRight" role="document">
      <div v-if="modal" class="o-modal__content">
        <iframe :src="modal.link" frameborder="0" sandbox=""></iframe>
        <iframe :src="modal.comments" frameborder="0" sandbox=""></iframe>
      </div>
      <button class="o-modal__close c-btn-cta" @click="togglePost()">X</button>
    </div>
  </aside>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mapActions, mapState } from 'vuex'
  export default defineComponent({
    name: 'Modal',
    computed: {
      ...mapState(['modal']),
    },
    methods: {
      ...mapActions(['togglePost']),
    },
  })
</script>
