<template>
  <select class="c-input__select c-order" v-model="select">
    <option v-for="order in getOrder">{{ order }}</option>
  </select>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'getCurrentOrder',
      'getOrder'
    ]),
    select: {
      get () {
        return this.$store.state.currentOrder
      },
      set (value) {
        this.$store.dispatch('changeOrder', value)
      }
    }
  },
  methods: {
    ...mapActions([
      'changeOrder'
    ])
  }
}
</script>

<style>
.c-order {
  margin-right: 24px;
  padding-right: 24px;
}
</style>