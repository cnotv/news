import api from '@/helpers/api'
import { State } from '@/types/state'
import { ActionTree, Commit } from 'vuex'

interface ActionPayload {
  commit: Commit
  state: State
}

export const actions: ActionTree<State, State> = {
  // unique api query after defining arguments (states)
  commitPosts({ commit, state }) {
    commitPosts({ commit, state })
  },

  commitSubreddits({ commit }, query: string) {
    commit('SET_LOADING', true)
    commit('LOAD_POSTS', '')

    api
      .fetchSubs(query)
      .then(
        (response) => {
          commit('LOAD_POSTS', response)
        },
        () => commit('LOAD_POSTS', [])
      )
      .finally(() => {
        commit('SET_LOADING', false)
      })
  },

  loadMore({ commit, state }) {
    if (!state.after) {
      return
    }

    const query = `${state.currentSub}/${state.settings.sort}.json?allow_over18=1&limit=${state.settings.limit}&after=${state.after}`
    commit('SET_LOADING', true)
    commit('SET_QUERY', query)

    api
      .fetchData(state.query)
      .then(
        (response) => {
          const { posts, after } = response
          commit('LOAD_MORE', posts)
          commit('SET_AFTER', after)
        },
        () => commit('LOAD_POSTS', {})
      )
      .finally(() => {
        commit('SET_LOADING', false)
      })
  },

  addSub({ commit }, sub: string) {
    commit('ADD_SUB', sub)
  },

  removeSub({ commit }, sub: string) {
    commit('REMOVE_SUB', sub)
  },

  changeSub({ commit, state }, sub: string) {
    commit('CURRENT_SUB', sub)

    // update query before api request
    commit(
      'SET_QUERY',
      `${state.currentSub}/${state.settings.sort}.json?allow_over18=1&limit=${state.settings.limit}`
    )
    commitPosts({ commit, state })
  },

  changeLayout({ commit }, layout: number) {
    commit('CURRENT_LAYOUT', layout)
  },

  changeLimit({ commit, state }, limit: string) {
    commit('CURRENT_LIMIT', limit)

    // switch between search query or subreddit feed if no input
    if (state.search.string === '') {
      commit(
        'SET_QUERY',
        `${state.currentSub}/${state.settings.sort}.json?allow_over18=1&limit=${state.settings.limit}`
      )
      commitPosts({ commit, state })
    } else {
      // update search after change
      changeSearch({ commit, state })
    }
  },

  // change subreddit order
  changeOrder({ commit, state }, order: string) {
    commit('CURRENT_ORDER', order)
    commit(
      'SET_QUERY',
      `${state.currentSub}/${state.settings.sort}.json?allow_over18=1&limit=${state.settings.limit}`
    )
    commitPosts({ commit, state })
  },

  changeSearch({ commit, state }) {
    changeSearch({ commit, state })
  },

  changeSearchGlobal({ commit, state }) {
    commit('SEARCH_GLOBAL')
    // update search after change
    changeSearch({ commit, state })
  },

  changeSearchOpen({ commit }, close: boolean) {
    commit('SEARCH_OPEN', close)
  },

  changeSearchTime({ commit, state }, time = state.search.currentTime) {
    commit('SEARCH_TIME', time)
    // update search after change
    changeSearch({ commit, state })
  },

  resetState({ commit }) {
    commit('RESET_STATE')
  },
}

const commitPosts = ({ state, commit }: ActionPayload) => {
  if (state.query === '') {
    return
  }

  commit('SET_LOADING', true)
  commit('LOAD_POSTS', '')

  api
    .fetchData(state.query)
    .then(
      (response) => {
        const { posts, after } = response
        commit('LOAD_POSTS', posts)
        commit('SET_AFTER', after)
      },
      () => commit('LOAD_POSTS', [])
    )
    .finally(() => {
      commit('SET_LOADING', false)
    })
}

const changeSearch = ({ state, commit }: ActionPayload) => {
  const search: string = state.search.string
  let searchGlobal = ''

  // if filter search to subreddit
  if (!state.search.global) {
    searchGlobal = `+subreddit:${state.currentSub}`
  }

  // if no input switch between search query or subreddit feed
  if (search.length > 0) {
    commit('SET_SEARCH', search)
    commit(
      'SET_QUERY',
      `${state.currentSub}/search.json?allow_over18=1&limit=${state.settings.limit}&t=${state.search.currentTime}&q=${state.search.string}${searchGlobal}`
    )
  } else {
    commit('SET_SEARCH', '')
    commit('SET_QUERY', `${state.currentSub}/${state.settings.sort}.json`)
  }

  // submit search request with small delay
  commitPosts({ commit, state })
}
