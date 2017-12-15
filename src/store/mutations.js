export default {
  PAGE: (state, page) => {
    state.page = page
  },
  POSTS: (state, posts) => {
    state.posts = posts
  },
  POST: (state, post) => {
    state.post = post
  },
  ADD_SUB: (state, newSub) => {
    let subs = state.subreddits
    if (!subs.includes(newSub)) {
      subs.push(newSub)
    }
    state.subreddits = subs
  },
  REMOVE_SUB: (state, removeSub) => {
    let subs = state.subreddits
    if (subs.includes(removeSub)) {
      state.subreddits = subs.filter(e => e !== removeSub)
    }
  },
  CURRENT_SUB: (state, currentSub) => {
    state.currentSub = currentSub
  },
  CURRENT_ORDER: (state, currentOrder) => {
    state.currentOrder = currentOrder
  },
  ORDER: (state, order) => {
    state.order = order
  },
  CURRENT_LIMIT: (state, currentLimit) => {
    state.currentLimit = currentLimit
  },
  SEARCH: (state, search) => {
    state.search = search
  },
  SEARCHGLOBAL: (state) => {
    state.searchGlobal = !state.searchGlobal
  },
  QUERY: (state, query) => {
    state.query = query
  }
}
