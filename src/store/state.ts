export default {
  after: "",
  currentSub: "",
  loading: false,
  posts: [],
  query: "",
  search: {
    currentTime: "",
    global: false,
    open: false,
    string: ""
  },
  settings: {
    layout: 0,
    limit: "24",
    sort: "hot"
  },
  strict: process.env.NODE_ENV !== "production",
  subreddits: []
};
