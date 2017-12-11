import axios from 'axios'

export default {
  baseUrl: `//www.reddit.com/r/`,

  fetchData (current, order) {
    return new Promise((resolve, reject) => {
      axios.defaults.baseURL = this.baseUrl

      return axios.get(`${current}/${order}.json`).then(
        response => {
          resolve(response.data.data.children)
        })
    })
  }
}
