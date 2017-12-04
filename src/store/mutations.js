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
  CURRENT: (state, current) => {
    state.current = current
  },
  ORDER: (state, order) => {
    state.order = order
  },
  SEARCH: (state, search) => {
    state.search = search
  }
}
