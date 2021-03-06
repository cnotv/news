export default {
  LOAD_POSTS: (state: State, posts: RedditPost[] | PostSub[]) => {
    state.posts = posts;
  },
  LOAD_MORE: (state: State, posts: RedditPost[]) => {
    state.posts = [...state.posts, ...posts];
  },
  SET_LOADING: (state: State, loading: boolean) => {
    state.loading = loading;
  },
  SET_AFTER: (state: State, id: string) => {
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
  CURRENT_ORDER: (state: State, sort: string) => {
    state.settings.sort = sort;
  },
  CURRENT_LAYOUT: (state: State, layout: number) => {
    state.settings.layout = layout;
  },
  CURRENT_LIMIT: (state: State, limit: string) => {
    state.settings.limit = limit;
  },
  SET_SEARCH: (state: State, search: string) => {
    state.search.string = search;
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
    state.search.currentTime = time;
  },
  SET_QUERY: (state: State, query: string) => {
    state.query = query;
  },
  RESET_STATE: (state: State) => {
    // state = state;
  }
};
