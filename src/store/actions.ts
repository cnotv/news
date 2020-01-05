import api from "@/helpers/api";
import debounce from "lodash.debounce";

// unique api query after defining arguments (states)
export const commitPosts = ({ commit, state }) => {
  if (state.query === "") {
    return;
  }

  commit("SET_LOADING", true);
  commit("LOAD_POSTS", "");

  api
    .fetchData(state.query)
    .then(
      response => {
        const { posts, after } = response;
        commit("LOAD_POSTS", posts);
        commit("SET_AFTER", after);
      },
      () => commit("LOAD_POSTS", {})
    )
    .finally(() => {
      commit("SET_LOADING", false);
    });
};

export const loadMore = ({ commit, state }) => {
  if (!state.after) {
    return;
  }

  const query = `${state.currentSub}/${state.currentSort}.json?limit=${state.currentLimit}&after=${state.after}`;
  commit("SET_LOADING", true);
  commit("SET_QUERY", query);

  api
    .fetchData(state.query)
    .then(
      response => {
        const { posts, after } = response;
        commit("LOAD_MORE", posts);
        commit("SET_AFTER", after);
      },
      () => commit("LOAD_POSTS", {})
    )
    .finally(() => {
      commit("SET_LOADING", false);
    });
};

export const addSub = ({ commit }, sub: string) => {
  commit("ADD_SUB", sub);
};

export const removeSub = ({ commit }, sub: string) => {
  commit("REMOVE_SUB", sub);
};

export const changeSub = ({ commit, state }, sub: string) => {
  commit("CURRENT_SUB", sub);

  // update query before api request
  commit(
    "SET_QUERY",
    `${state.currentSub}/${state.currentSort}.json?limit=${state.currentLimit}`
  );
  commitPosts({ commit, state });
};

export const changeLayout = ({ commit }, layout: number) => {
  commit("CURRENT_LAYOUT", layout);
};

export const changeLimit = ({ commit, state }, limit: string) => {
  commit("CURRENT_LIMIT", limit);

  // switch between search query or subreddit feed if no input
  if (state.search.string === "") {
    commit(
      "SET_QUERY",
      `${state.currentSub}/${state.currentSort}.json?limit=${state.currentLimit}`
    );
    commitPosts({ commit, state });
  } else {
    // update search after change
    changeSearch({ commit, state });
  }
};

// change subreddit order
export const changeOrder = ({ commit, state }, order: string) => {
  commit("CURRENT_ORDER", order);
  commit(
    "SET_QUERY",
    `${state.currentSub}/${state.currentSort}.json?limit=${state.currentLimit}`
  );
  commitPosts({ commit, state });
};

export const changeSearch = debounce(
  ({ commit, state }, search: string = state.search.string) => {
    let searchGlobal = "";

    // if filter search to subreddit
    if (!state.search.global) {
      searchGlobal = `+subreddit:${state.currentSub}`;
    }

    // if no input switch between search query or subreddit feed
    if (search.length > 0) {
      commit("SET_SEARCH", search);
      commit(
        "SET_QUERY",
        `${state.currentSub}/search.json?limit=${state.currentLimit}&t=${state.search.currentTime}&q=${state.search.string}${searchGlobal}`
      );
    } else {
      commit("SET_SEARCH", "");
      commit("SET_QUERY", `${state.currentSub}/${state.currentSort}.json`);
    }

    // submit search request with small delay
    commitPosts({ commit, state });
  },
  500
);

export const changeSearchGlobal = ({ commit, state }) => {
  commit("SEARCH_GLOBAL");
  // update search after change
  changeSearch({ commit, state });
};

export const changeSearchOpen = ({ commit }, close: boolean) => {
  commit("SEARCH_OPEN", close);
};

export const changeSearchSub = ({ commit, state }, close: boolean) => {
  commit("SEARCH_SUB", close);
  // update search after change
  changeSearch({ commit, state });
};

export const changeSearchTime = ({ commit, state }, time = state.time) => {
  commit("SEARCH_TIME", time);
  // update search after change
  changeSearch({ commit, state });
};

export const resetState = ({ commit }) => {
  commit("RESET_STATE");
};
