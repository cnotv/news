export default {
  POSTS: (state, posts) => {
    state.posts = posts;
  },
  LOADING: (state, loading) => {
    state.loading = loading;
  },
  ADD_SUB: (state, newSub) => {
    let subs = state.subreddits;
    if (!subs.includes(newSub)) {
      subs.push(newSub);
    }
    state.subreddits = subs;
  },
  REMOVE_SUB: (state, removeSub) => {
    let subs = state.subreddits;
    if (subs.includes(removeSub)) {
      state.subreddits = subs.filter(e => e !== removeSub);
    }
  },
  CURRENT_SUB: (state, currentSub) => {
    state.search.global = false;
    state.currentSub = currentSub;
  },
  CURRENT_ORDER: (state, currentOrder) => {
    state.currentOrder = currentOrder;
  },
  CURRENT_LAYOUT: (state, currentLayout) => {
    state.currentLayout = currentLayout;
  },
  ORDER: (state, order) => {
    state.order = order;
  },
  CURRENT_LIMIT: (state, currentLimit) => {
    state.currentLimit = currentLimit;
  },
  SEARCH: (state, search) => {
    state.search.string = search;
  },
  SEARCHSUB: (state, close) => {
    state.search.global = true;
    if (close === false || close === true) {
      state.search.sub = close;
    } else {
      state.search.sub = !state.search.sub;
    }
  },
  SEARCHGLOBAL: state => {
    state.search.global = !state.search.global;
  },
  SEARCHOPEN: (state, close) => {
    if (close) {
      state.search.open = false;
    } else {
      state.search.open = !state.search.open;
    }
  },
  SEARCHTIME: (state, time) => {
    state.search.timecurrent = time;
  },
  QUERY: (state, query) => {
    state.query = query;
  },
  RESET_STATE: state => {
    // state = state;
  }
};
