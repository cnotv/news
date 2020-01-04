export default {
  LOAD_POSTS: (state: State, posts: any[]) => {
    state.posts = posts;
  },
  LOAD_MORE: (state: State, posts: any[]) => {
    state.posts = [...state.posts, ...posts];
  },
  SET_LOADING: (state: State, loading: boolean) => {
    state.loading = loading;
  },
  SET_AFTER: (state: State, id) => {
    state.after = id;
  },
  ADD_SUB: (state: State, newSub: string) => {
    let subs = state.subreddits;
    if (!subs.includes(newSub)) {
      subs.push(newSub);
    }
    state.subreddits = subs;
  },
  REMOVE_SUB: (state: State, removeSub: string) => {
    let subs = state.subreddits;
    if (subs.includes(removeSub)) {
      state.subreddits = subs.filter(e => e !== removeSub);
    }
  },
  CURRENT_SUB: (state: State, currentSub: string) => {
    state.search.global = false;
    state.currentSub = currentSub;
  },
  CURRENT_ORDER: (state: State, currentSort: string) => {
    state.currentSort = currentSort;
  },
  CURRENT_LAYOUT: (state: State, currentLayout: number) => {
    state.currentLayout = currentLayout;
  },
  CURRENT_LIMIT: (state: State, currentLimit: string) => {
    state.currentLimit = currentLimit;
  },
  SET_SEARCH: (state: State, search: string) => {
    state.search.string = search;
  },
  SEARCH_SUB: (state: State, close: boolean) => {
    state.search.global = true;
    if (close === false || close === true) {
      state.search.sub = close;
    } else {
      state.search.sub = !state.search.sub;
    }
  },
  SEARCH_GLOBAL: (state: State) => {
    state.search.global = !state.search.global;
  },
  SEARCH_OPEN: (state: State, close: boolean) => {
    if (close) {
      state.search.open = false;
    } else {
      state.search.open = !state.search.open;
    }
  },
  SEARCH_TIME: (state: State, time: string) => {
    state.search.timecurrent = time;
  },
  SET_QUERY: (state: State, query: string) => {
    state.query = query;
  },
  RESET_STATE: (state: State) => {
    // state = state;
  }
};
