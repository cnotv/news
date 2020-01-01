export default {
  strict: process.env.NODE_ENV !== "production",
  posts: null,
  after: "",
  loading: false,
  subreddit: {},
  subreddits: [],
  currentSub: "",
  limits: ["12", "24", "48", "96"],
  currentLimit: "24",
  currentOrder: "new",
  order: ["hot", "new", "rising", "controversial", "top", "gilded"],
  query: "",
  search: {
    string: "",
    open: false,
    sub: true,
    time: ["year", "month", "week", "day", "hour"],
    timecurrent: "",
    global: false
  },
  layout: ["list", "th", "newspaper-o", "picture-o"],
  currentLayout: 0
};
