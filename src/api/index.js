import axios from 'axios'

export default {
  baseUrl: `//www.reddit.com/r/`,

  fetchData (current, order) {
    return new Promise((resolve, reject) => {
      axios.defaults.baseURL = this.baseUrl
      return axios.get(`${current}/${order}.json`).then(response => {
        // const data = [...response.data]
        // resolve(data)
        resolve(response.data.data.children)
        // console.log(response.data.data.children)
      })
    })
  }
}
