export default {
  POSTS: (state: State, posts: any[]) => {
    state.posts = posts;
  },
  LOADING_STATUS: (state: State, loading: boolean) => {
    state.loading = loading;
  },
  LOAD_MORE: (state: State, posts: any[]) => {
    state.posts = [...state.posts, ...posts];
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
  CURRENT_ORDER: (state: State, currentOrder: string) => {
    state.currentOrder = currentOrder;
  },
  CURRENT_LAYOUT: (state: State, currentLayout: number) => {
    state.currentLayout = currentLayout;
  },
  ORDER: (state: State, order: string[]) => {
    state.order = order;
  },
  CURRENT_LIMIT: (state: State, currentLimit: string) => {
    state.currentLimit = currentLimit;
  },
  SEARCH: (state: State, search: string) => {
    state.search.string = search;
  },
  SEARCHSUB: (state: State, close: boolean) => {
    state.search.global = true;
    if (close === false || close === true) {
      state.search.sub = close;
    } else {
      state.search.sub = !state.search.sub;
    }
  },
  SEARCHGLOBAL: (state: State) => {
    state.search.global = !state.search.global;
  },
  SEARCHOPEN: (state: State, close: boolean) => {
    if (close) {
      state.search.open = false;
    } else {
      state.search.open = !state.search.open;
    }
  },
  SEARCHTIME: (state: State, time: string) => {
    state.search.timecurrent = time;
  },
  QUERY: (state: State, query: string) => {
    state.query = query;
  },
  RESET_STATE: (state: State) => {
    // state = state;
  }
};
