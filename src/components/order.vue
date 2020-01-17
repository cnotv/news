<template>
  <select class="c-input__select c-order" v-model="select">
    <option v-for="sort in getSorting" v-bind:key="sort">{{ sort }}</option>
  </select>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";

export default Vue.extend({
  computed: {
    ...mapGetters(["getSort", "getSorting"]),
    select: {
      get(): string {
        return this.$store.state.currentSort;
      },
      set(value: string): void {
        this.$store.dispatch("changeOrder", value);
      }
    }
  },
  methods: {
    ...mapActions(["changeOrder"])
  }
});
</script>

<style>
.c-order {
  margin-right: 24px;
  padding-right: 24px;
}
</style>
