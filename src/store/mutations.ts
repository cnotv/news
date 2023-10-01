import { PostSub } from '@/types/api'
import { RedditPost } from '@/types/reddit-posts'
import { Modal, State, Subreddit } from '@/types/state'

export default {
  LOAD_POSTS: (state: State, posts: (RedditPost | PostSub)[]) => {
    state.posts = posts
  },
  LOAD_MORE: (state: State, posts: (RedditPost | PostSub)[]) => {
    state.posts = [...state.posts, ...posts]
  },
  SET_LOADING: (state: State, loading: boolean) => {
    state.loading = loading
  },
  SET_AFTER: (state: State, id: string) => {
    state.after = id
  },
  ADD_SUB: (state: State, name: string) => {
    const isNew = !state.subreddits.find((e) => e.name === name)
    if (isNew) {
      const subreddit: Subreddit = {
        id: state.subreddits.length,
        name,
      }
      state.subreddits = [...state.subreddits, subreddit]
    }
    state.subreddits
  },
  REMOVE_SUB: (state: State, id: string) => {
    state.subreddits = state.subreddits.filter((subreddit) => subreddit.id !== id)
  },
  UPDATE_SUBS: (state: State, subreddits: Subreddit[]) => {
    state.subreddits = subreddits
  },
  CURRENT_SUB: (state: State, currentSub: string) => {
    state.search.global = false
    state.currentSub = currentSub
  },
  CURRENT_ORDER: (state: State, sort: string) => {
    state.settings.sort = sort
  },
  CURRENT_LAYOUT: (state: State, layout: number) => {
    state.settings.layout = layout
  },
  CURRENT_LIMIT: (state: State, limit: string) => {
    state.settings.limit = limit
  },
  SET_SEARCH: (state: State, search: string) => {
    state.search.string = search
  },
  SEARCH_GLOBAL: (state: State) => {
    state.search.global = !state.search.global
  },
  SEARCH_OPEN: (state: State, close: boolean) => {
    if (close) {
      state.search.open = false
    } else {
      state.search.open = !state.search.open
    }
  },
  SEARCH_TIME: (state: State, time: string) => {
    state.search.currentTime = time
  },
  SET_QUERY: (state: State, query: string) => {
    state.query = query
  },
  TOGGLE_POST: (state: State, meta?: Modal) => {
    state.modal = meta

    const className = 'is-modal-open'
    if (meta) {
      document.body.classList.add(className)
    } else {
      document.body.classList.remove(className)
    }
  },
  RESET_STATE: () => {
    void 0
  },
}
