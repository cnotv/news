import axios from 'axios'
import { AxiosRequestConfig } from 'axios'

function _subToPost(data: RedditResponseData): PostSub[] {
  return data.children.map((sub) => {
    return {
      title: sub.data.title,
      description: sub.data.public_description,
      name: sub.data.display_name,
      subscribers: sub.data.subscribers,
      categories: sub.data.advertiser_category,
    }
  })
}

export default {
  baseUrl: ``,

  async fetchData(query: string): Promise<Posts> {
    axios.defaults.baseURL = `//www.reddit.com/r/`

    // FIXME: Convert query into HTTP Parameters options
    return axios.get(query).then((response) => {
      return {
        posts: response.data.data.children,
        after: response.data.data.after,
      }
    })
  },

  async fetchSubs(q: string, after?: string): Promise<PostSub[]> {
    const url = `//www.reddit.com/subreddits/search.json`
    const params = {
      allow_over18: '1',
      sort: 'relevance',
      type: 'sr',
      q,
      after,
    }
    const config: AxiosRequestConfig = { params }

    return axios.get(url, config).then((response) => _subToPost(response.data.data))
  },
}
