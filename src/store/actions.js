import api from './../api'
import debounce from 'lodash.debounce'

// unique api query after defining arguments (states)
export const commitPosts = ({ commit, state }) => {
  if (state.query !== '') {
    commit('POSTS', '')
    return new Promise((resolve, reject) => {
      api.fetchData(state.query).then(
        response => {
          commit('POSTS', response)
          resolve(response)
        },
        response => {
          reject(response)
        }
      )
    })
  }
}

export const addSub = ({ commit, state }, sub) => {
  commit('ADD_SUB', sub)
}

export const removeSub = ({ commit, state }, sub) => {
  commit('REMOVE_SUB', sub)
}

export const changeSub = ({ commit, state }, sub) => {
  commit('CURRENT_SUB', sub)

  // update query before api request
  commit('QUERY', `${state.currentSub}/${state.currentOrder}.json?limit=${state.currentLimit}`)
  commitPosts({ commit, state })
}

export const changeLayout = ({ commit, state }, layout) => {
  commit('CURRENT_LAYOUT', layout)
}

export const changeLimit = ({ commit, state }, limit) => {
  commit('CURRENT_LIMIT', limit)

  // switch between search query or subreddit feed if no input
  if (state.search.string === '') {
    commit('QUERY', `${state.currentSub}/${state.currentOrder}.json?limit=${state.currentLimit}`)
    commitPosts({ commit, state })
  } else {
  // update search after change
    changeSearch({ commit, state })
  }
}

// change subreddit order
export const changeOrder = ({ commit, state }, order) => {
  commit('CURRENT_ORDER', order)
  commit('QUERY', `${state.currentSub}/${state.currentOrder}.json?limit=${state.currentLimit}`)
  commitPosts({ commit, state })
}

export const changeSearch = debounce(({ commit, state }, search = state.search.string) => {
  let searchGlobal = ''

  // if filter search to subreddit
  if (!state.search.global) {
    searchGlobal = `+subreddit:${state.currentSub}`
  }

  // if no input switch between search query or subreddit feed
  if (search.length > 0) {
    commit('SEARCH', search)
    commit('QUERY', `${state.currentSub}/search.json?limit=${state.currentLimit}&q=${state.search.string}${searchGlobal}&t=${state.timecurrent}`)
  } else {
    commit('SEARCH', '')
    commit('QUERY', `${state.currentSub}/${state.currentOrder}.json`)
  }

  // submit search request with small delay
  commitPosts({ commit, state })
}, 500)

export const changeSearchGlobal = ({ commit, state }) => {
  commit('SEARCHGLOBAL')
  // update search after change
  changeSearch({ commit, state })
}

export const changeSearchOpen = ({ commit, state }, close) => {
  commit('SEARCHOPEN', close)
}

export const changeSearchSub = ({ commit, state }, close) => {
  commit('SEARCHSUB', close)
  // update search after change
  changeSearch({ commit, state })
}

export const changeSearchTime = ({ commit, state }, time = state.time) => {
  commit('SEARCHTIME', time)
  // update search after change
  changeSearch({ commit, state })
}
