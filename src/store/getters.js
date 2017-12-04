export const getPage = state => state.page
export const getPosts = state => state.posts
export const getPost = state => state.post
export const getSubreddits = state => state.subreddits
export const getOrder = state => state.order
export const getSearch = state => state.search
export const getCurrent = state => state.current

// import axios from 'axios'

// getters: {
//   // changeCurrent: (state, getters) => (newCurrent) => {
//   //   state.currentSub = newCurrent
//   // },
//   getData: (state, getters) => (currentSub, search, order) => {
//     return axios.get(`http://www.reddit.com/r/` + currentSub + `/` + order + `.json?q=` + search, {
//       params: {
//         page: 1,
//         per_page: 5
//       }
//     })
//       .then(json => {
//         return { posts: json.data }
//       })
//       .catch(e => {
//         return { error: e }
//       })
//   }
// }
