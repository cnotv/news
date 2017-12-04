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

export const changeCurrent = ({ commit, state }, current) => {
  commit('CURRENT', current)
}

export const changeOrder = ({ commit, state }, current) => {
  commit('ORDER', current)
}
