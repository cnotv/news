import api from './../api'

export const commitPosts = ({ commit, state }) => {
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

export const addSub = ({ commit, state }, sub) => {
  commit('ADD_SUB', sub)
}

export const removeSub = ({ commit, state }, sub) => {
  commit('REMOVE_SUB', sub)
}

export const changeSub = ({ commit, state }, sub) => {
  commit('CURRENT_SUB', sub)
  commit('QUERY', `${state.currentSub}/${state.currentOrder}.json?limit=${state.currentLimit}`)
  commitPosts({ commit, state })
}

export const changeLayout = ({ commit, state }, layout) => {
  commit('CURRENT_LAYOUT', layout)
}

export const changeLimit = ({ commit, state }, limit) => {
  commit('CURRENT_LIMIT', limit)
  commit('QUERY', `${state.currentSub}/${state.currentOrder}.json?limit=${state.currentLimit}`)
  commitPosts({ commit, state })
}

export const changeOrder = ({ commit, state }, order) => {
  commit('CURRENT_ORDER', order)
  commit('QUERY', `${state.currentSub}/${state.currentOrder}.json?limit=${state.currentLimit}`)
  commitPosts({ commit, state })
}

export const changeSearch = ({ commit, state }, search = state.search) => {
  let searchGlobal = ''

  if (!state.searchGlobal) {
    searchGlobal = `+subreddit:${state.currentSub}`
  }

  if (search.length > 0) {
    commit('SEARCH', search)
    commit('QUERY', `${state.currentSub}/search.json?limit=${state.currentLimit}&q=${state.search}${searchGlobal}&t=${state.searchTimeCurrent}`)
  } else {
    commit('SEARCH', '')
    commit('QUERY', `${state.currentSub}/${state.currentOrder}.json`)
  }
  commitPosts({ commit, state })
}

export const changeSearchGlobal = ({ commit, state }) => {
  commit('SEARCHGLOBAL')
  changeSearch({ commit, state })
}

export const changeSearchTime = ({ commit, state }, time = state.time) => {
  commit('SEARCHTIME', time)
  changeSearch({ commit, state })
}
