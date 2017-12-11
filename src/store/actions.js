import api from './../api'

export const commitPosts = ({ commit, state }) => {
  return new Promise((resolve, reject) => {
    api.fetchData(state.currentSub, state.currentOrder).then(
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
  commitPosts({ commit, state })
}
