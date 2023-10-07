import { Posts, PostSub } from '@/types/api'
import { RedditResponseChild, RedditResponseData } from '@/types/reddit-posts'
import axios from 'axios'
import axiosRetry from 'axios-retry'
import { AxiosRequestConfig } from 'axios'

axiosRetry(axios, {
  retries: 3, // Number of retries (Defaults to 3)
})

function _subToPost(data: RedditResponseData): PostSub[] {
  return data.children.map((sub: RedditResponseChild) => {
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
    return axios
      .get(query)
      .then((response) => ({
        posts: response.data.data.children,
        after: response.data.data.after,
      }))
      .catch((error) => {
        console.log('Error: ', error)

        return { posts: [], after: '' }
      })
  },

  async fetchSubs(q: string, after?: string): Promise<PostSub[]> {
    const url = `//www.reddit.com/subreddits/search.json`
    const params = {
      include_over_18: 'true',
      label_nsfw: 'true',
      sort: 'relevance',
      type: 'sr',
      q,
      after,
    }
    const config: AxiosRequestConfig = { params }

    return axios
      .get(url, config)
      .then((response) => _subToPost(response.data.data))
      .catch((error) => {
        console.log('Error: ', error)

        return []
      })
  },
}
