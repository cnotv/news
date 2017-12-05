// import api from '../api/index'

// export const getPage = ({ commit, state }, slug) => {
//   return new Promise((resolve, reject) => {
//     api.getPage(slug).then(
//       response => {
//         commit('PAGE', response)
//         resolve(response)
//       },
//       response => {
//         reject(response)
//       }
//     )
//   })
// }

export const changeSub = ({ commit, state }, current) => {
  commit('CURRENT_SUB', current)
}

export const changeOrder = ({ commit, state }, current) => {
  commit('CURRENT_ORDER', current)
}
