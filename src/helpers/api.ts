import axios from "axios";
import { AxiosRequestConfig } from "axios";

export default {
  baseUrl: ``,

  async fetchData(query: string): Promise<Posts> {
    axios.defaults.baseURL = `//www.reddit.com/r/`;

    // FIXME: Convert query into HTTP Parameters options
    return axios.get(query).then(response => {
      return {
        posts: response.data.data.children,
        after: response.data.data.after
      };
    });
  },

  async fetchSubs(q: string, after?: string): Promise<SubredditsIndex> {
    const url = `https://gateway.reddit.com/desktopapi/v1/search`;
    const params = {
      allow_over18: "1",
      sort: "relevance",
      type: "sr",
      q,
      after
    };
    const config: AxiosRequestConfig = { params };

    return axios
      .get<Subreddits>(url, config)
      .then(response => response.data.subreddits);
  }
};
