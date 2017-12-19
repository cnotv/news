import axios from 'axios'

export default {
  baseUrl: `//www.reddit.com/r/`,

  fetchData (query) {
    return new Promise((resolve, reject) => {
      axios.defaults.baseURL = this.baseUrl

      return axios.get(query).then(
        response => {
          resolve(response.data.data.children)
        },
        response => {
          reject(response)
        }
      )
    })
  }
}
