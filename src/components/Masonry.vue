<template>
  <div ref="masonry" class="masonry">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { ref, onMounted, onUpdated, nextTick, type DefineComponent, type Ref } from 'vue'

  export default {
    setup() {
      const masonry = ref(null) as Ref<HTMLDivElement | null>

      const layoutMasonry = async () => {
        await nextTick()
        const masonryGrid = masonry.value
        if (masonryGrid) {
          const columnWidth = masonryGrid.offsetWidth / 3
          let columns: HTMLDivElement[][] = Array.from({ length: 3 }, () => [])

          const items = Array.from(masonryGrid.children)
          items.forEach((item, index) => {
            const column: Element[] = columns[index % 3]
            column.push(item)
          })

          columns = columns.map((column, i) => {
            const columnEl = document.createElement('div')
            columnEl.style.width = `${columnWidth}px`
            columnEl.style.float = 'left'
            column.forEach((item) => columnEl.appendChild(item))
            return columnEl as unknown as HTMLDivElement[]
          })

          masonryGrid.innerHTML = ''
          columns.forEach((column) => masonryGrid.appendChild(column as unknown as Node))
        }
      }

      onMounted(layoutMasonry)
      onUpdated(layoutMasonry)

      return { masonry } as unknown as DefineComponent
    },
  }
</script>

<style scoped>
  .masonry {
    width: 100%;
    display: flex;
  }
</style>
