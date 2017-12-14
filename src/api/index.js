import axios from 'axios'

export default {
  baseUrl: `//www.reddit.com/r/`,

  fetchData (current, order, search) {
    return new Promise((resolve, reject) => {
      let urlComposer = `${current}/search.json?q=${search}+subreddit:${current}`
      axios.defaults.baseURL = this.baseUrl

      return axios.get(urlComposer).then(
        response => {
          resolve(response.data.data.children)
        })
    })
  }
}
