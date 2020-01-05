import axios from "axios";

export default {
  baseUrl: `//www.reddit.com/r/`,

  async fetchData(query: string): Promise<RedditResponse> {
    axios.defaults.baseURL = this.baseUrl;

    // FIXME: Convert query into HTTP Parameters options
    return axios.get(query).then(response => {
      return {
        posts: response.data.data.children,
        after: response.data.data.after
      };
    });
  }
};
