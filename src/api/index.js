import axios from 'axios'

export default {
  baseUrl: `//www.reddit.com/r/`,

  fetchData (current, order, search) {
    return new Promise((resolve, reject) => {
      axios.defaults.baseURL = this.baseUrl

      return axios.get(`${current}/${order}.json?q=${search}`).then(
        response => {
          resolve(response.data.data.children)
        })
    })
  }
}
