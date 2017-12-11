import api from './../api'

export const commitPosts = ({ commit }, sub, order) => {
  return new Promise((resolve, reject) => {
    api.fetchData(sub, order).then(
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

export const changeSub = ({ commit, state }, sub = state.currentSub, order = state.currentOrder) => {
  commit('CURRENT_SUB', sub)
  commitPosts({ commit }, sub, order)
}

export const changeOrder = ({ commit, state }, order = state.currentOrder, sub = state.currentSub) => {
  commit('CURRENT_ORDER', order)
  commitPosts({ commit }, sub, order)
}
