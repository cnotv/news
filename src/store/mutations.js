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
  CURRENT_SUB: (state, currentSub) => {
    state.currentSub = currentSub
  },
  CURRENT_ORDER: (state, currentOrder) => {
    state.currentOrder = currentOrder
  },
  ORDER: (state, order) => {
    state.order = order
  },
  SEARCH: (state, search) => {
    state.search = search
  }
}
