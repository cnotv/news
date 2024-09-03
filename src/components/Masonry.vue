<template>
  <div ref="masonry" class="masonry">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { ref, onMounted, onUpdated, nextTick } from 'vue'

  export default {
    setup() {
      const masonry = ref(null)

      const layoutMasonry = async () => {
        await nextTick()
        const masonryGrid = masonry.value
        if (masonryGrid) {
          const columnWidth = masonryGrid.offsetWidth / 3
          let columns = Array.from({ length: 3 }, () => [])

          const items = Array.from(masonryGrid.children)
          items.forEach((item, index) => {
            const column = columns[index % 3]
            column.push(item)
          })

          columns = columns.map((column, i) => {
            const columnEl = document.createElement('div')
            columnEl.style.width = `${columnWidth}px`
            columnEl.style.float = 'left'
            column.forEach((item) => columnEl.appendChild(item))
            return columnEl
          })

          masonryGrid.innerHTML = ''
          columns.forEach((column) => masonryGrid.appendChild(column))
        }
      }

      onMounted(layoutMasonry)
      onUpdated(layoutMasonry)

      return { masonry } as DefineComponent
    },
  }
</script>

<style scoped>
  .masonry {
    width: 100%;
    display: flex;
  }
  .masonry-item {
    /* Your item styles here */
  }
</style>
