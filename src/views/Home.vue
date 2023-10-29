<template>
  <section class="c-section">
    <div ref="container" class="c-container-full">
      <div
        v-if="getPosts.length > 0"
        ref="posts"
        class
        :class="[
          getLayout === 0 ? '' : '',
          getLayout === 1 ? 'c-row' : '',
          getLayout === 2 ? 'o-paper' : '',
          getLayout === 3 ? 'o-gallery' : '',
        ]"
      >
        <modal v-if="modal"></modal>
        <span v-if="!statusOnline">You are offline.</span>

        <template v-if="getLayout === 0">
          <List v-for="post in getPosts" :key="post.data.id" :data="post.data" />
        </template>
        <Card
          v-for="post in getPosts"
          v-else-if="getLayout === 1"
          :key="post.data.id"
          :data="post.data"
        />
        <template v-else-if="getLayout === 2">
          <Paper v-for="post in getPosts" :key="post.data.id" :data="post.data" />
        </template>
        <template v-else-if="getLayout === 3">
          <Gallery v-for="post in getPosts" :key="post.data.id" :data="post.data" />
        </template>
        <template v-else>
          <Subreddit v-for="post in getPosts" :key="post.data.id" :data="post.data" />
        </template>
      </div>

      <div v-else-if="getPosts">Sorry, no post found.</div>
      <div v-else class="is-loading"></div>
    </div>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mapGetters, mapActions, mapState } from 'vuex'
  import Modal from '@/components/Modal.vue'
  import Card from '@/components/Card.vue'
  import Gallery from '@/components/Gallery.vue'
  import List from '@/components/List.vue'
  import Paper from '@/components/Paper.vue'
  import Subreddit from '@/components/Subreddit.vue'
  import { getSubreddits } from '@/store/getters'
  import { store } from '@/store'
  import { Subreddit as ISubreddit } from '@/types/state'

  export default defineComponent({
    name: 'Home',
    components: { Modal, Card, Gallery, List, Subreddit, Paper },
    data() {
      return {
        refresh: false,
        statusOnline: true,
        loadThreshold: 0,
        noStorage: window.localStorage.getItem('vuex') === null,
      }
    },
    computed: {
      ...mapGetters([
        'getLayout',
        'isLoading',
        'getPosts',
        'getQuery',
        'getSearch',
        'getCurrentSub',
        'getSubreddits',
      ]),
      ...mapState(['modal']),
    },
    watch: {
      getPosts: {
        handler() {
          this._layout()

          setTimeout(() => {
            this._layout()
          }, 1000)
        },
      },
    },
    unmounted(): void {
      this._removeListeners()
    },
    mounted(): void {
      this._refreshListener()
      this._loadMoreListener()
      this._checkWelcome()

      // display post default
      store.dispatch('commitPosts')
      this._handleOffline()
      // Reset modal
      store.dispatch('togglePost')
    },
    methods: {
      ...mapActions(['commitPosts', 'changeSub']),

      _layout() {
        const postEl = this.$refs.posts as HTMLElement
        if (
          this.getLayout === 3 &&
          postEl &&
          getComputedStyle(postEl).gridTemplateRows !== 'masonry'
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const items = [...(postEl.childNodes as any)].filter((c) => c.nodeType === 1)
          const ncol = getComputedStyle(postEl).gridTemplateColumns.split(' ').length

          items.slice(ncol).forEach((item, i) => {
            item.style.removeProperty('margin-top')
            const prev = items[i].getBoundingClientRect().bottom /* bottom edge of item above */
            const current = item.getBoundingClientRect().top /* top edge of current item */
            const gap = 10
            const margin = `${prev - current + gap}px`
            item.style.marginTop = margin
          })
        }
      },

      _refreshListener() {
        const el = this.$refs.container as HTMLElement
        if (el) {
          el.addEventListener('touchend', this._refreshTrigger)
          el.addEventListener('touchstart', this._handleTouchStart)
        }
      },

      _loadMoreListener() {
        window.addEventListener('scroll', this._loadMore)
      },

      _removeListeners() {
        const el = this.$refs.container as HTMLElement
        if (el) {
          el.removeEventListener('touchend', this._refreshTrigger)
          el.removeEventListener('touchstart', this._handleTouchStart)
          el.removeEventListener('scroll', this._loadMore)
        }
      },

      _checkWelcome() {
        if (!this.getQuery || !getSubreddits) {
          this.$router.push({ name: 'welcome' })
        }
      },

      _toggleNetworkStatus({ type }: Event): void {
        this.statusOnline = type === 'online'
      },

      /**
       * Check if a refresh is required
       */
      _refreshCheck(y1: number, y2: number, el: HTMLElement): void {
        const threshold = 150
        const offsetY = y2 - y1
        if (window.scrollY <= 0) {
          if (offsetY < threshold) {
            el.style.transform = `translateY(${offsetY}px)`
          }
          if (offsetY > threshold / 1.5) {
            this.refresh = true
          } else {
            this.refresh = false
          }
        } else {
          el.style.transform = `translateY(0)`
          this.refresh = false
        }
      },

      /**
       * Check if a refresh is required
       */
      _changeSubCheck(x1: number, x2: number, el: HTMLElement): void {
        const threshold = 300
        const friction = 3
        const index = (this.getSubreddits as ISubreddit[])
          .map(({ name }) => name)
          .indexOf(this.getCurrentSub)
        const prev = this.getSubreddits[index + 1]
        const next = this.getSubreddits[index - 1]

        if (prev) {
          const left = x1 - x2
          if (left > threshold / 2 && left < threshold) {
            el.style.transform = `translateX(${-left / friction}px)`
          }

          if (left > threshold) {
            this.changeSub(prev.name)
            el.style.transform = `translateX(0)`
          }
        }

        if (next) {
          const right = x2 - x1
          if (right > threshold / 2 && right < threshold) {
            el.style.transform = `translateX(${right / friction}px)`
          }

          if (right > threshold) {
            this.changeSub(next.name)
            el.style.transform = `translateX(0)`
          }
        }
      },

      /**
       * Refresh if active.
       * Delete style alteration always.
       */
      _refreshTrigger(): void {
        const el = document.querySelector('body')
        if (el) {
          el.style.transform = `translateY(0)`
        }
        if (this.refresh) {
          store.dispatch('commitPosts')
        }
      },

      /**
       * Handle touch events for mobile:
       * - Top offset for refreshing
       * - Side swipes for changing subreddit
       */
      _handleTouchStart($start: TouchEvent): void {
        const X1 = $start.touches[0].screenX

        const move = ($move: TouchEvent): void => {
          const X2 = $move.touches[0].screenX
          const el = document.querySelector('body')
          if (el) {
            this._changeSubCheck(X1, X2, el)
            el.addEventListener('touchend', end)
          }
        }

        const end = (): void => {
          window.removeEventListener('touchmove', move)
          window.removeEventListener('touchend', end)
        }

        window.addEventListener('touchmove', move)
      },

      /**
       * Online check and local storage save
       */
      _handleOffline(): void {
        const noStorage = window.localStorage.getItem('vuex') === null

        // not online
        if (!window.navigator) {
          this.statusOnline = false
          return
        }

        // online
        this.statusOnline = Boolean(window.navigator.onLine)

        if (!this.statusOnline) {
          window.addEventListener('offline', this._toggleNetworkStatus)
          window.addEventListener('online', this._toggleNetworkStatus)

          if (noStorage) {
            store.dispatch('commitPosts')
          } else {
            // offline mode
            store.commit('commitPosts', JSON.parse(window.localStorage.getItem('vuex') || ''))
          }
        }
      },

      /**
       * Infinite scroll
       */
      _loadMore(): void {
        const el = this.$refs.posts as HTMLElement

        if (!el) {
          return
        }

        if (!this.loadThreshold) {
          this.loadThreshold = el.offsetHeight
        }

        // TODO: Replace with "el" after setting CSS grid layout
        const offset = window.scrollY - el.offsetHeight + this.loadThreshold
        const trigger = offset > 0
        if (trigger && !store.state.loading) {
          store.dispatch('loadMore')
        }
      },
    },
  })
</script>
