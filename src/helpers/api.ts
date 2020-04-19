import axios from "axios";
import { AxiosRequestConfig } from "axios";

function _subToPost(data: Subreddits): PostSub[] {
  const list: PostSub[] = [];
  const subs = Object.keys(data.subreddits);

  subs.forEach(sub => {
    list.push({
      title: data.subreddits[sub].title,
      description: data.subredditAboutInfo[sub].publicDescription,
      name: data.subreddits[sub].name,
      subscribers: data.subreddits[sub].subscribers,
      categories: data.subredditAboutInfo[sub].advertiserCategory
    });
  });

  return list;
}

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

  async fetchSubs(q: string, after?: string): Promise<PostSub[]> {
    const url = `//gateway.reddit.com/desktopapi/v1/search`;
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
      .then(response => _subToPost(response.data));
  }
};
