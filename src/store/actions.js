import api from './../api'

export const commitPosts = ({ commit, state }) => {
  return new Promise((resolve, reject) => {
    api.fetchData(state.currentSub, state.currentOrder, state.search).then(
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

export const changeSub = ({ commit, state }, sub) => {
  commit('CURRENT_SUB', sub)
  commitPosts({ commit, state })
}

export const changeOrder = ({ commit, state }, order) => {
  commit('CURRENT_ORDER', order)
  commit('SEARCH', '')
  commitPosts({ commit, state })
}

export const changeSearch = ({ commit, state }, string) => {
  if (string.length > 0) {
    commit('SEARCH', string)
    commit('CURRENT_ORDER', 'search')
  } else {
    commit('CURRENT_ORDER', state.order[0])
    commit('CURRENT_SUB', state.subreddits[0])
    commit('SEARCH', '')
  }
  commitPosts({ commit, state })
}
