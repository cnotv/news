export default {
  strict: process.env.NODE_ENV !== "production",
  posts: [],
  after: "",
  loading: false,
  subreddits: [],
  currentSub: "",
  limits: ["12", "24", "48", "96"],
  currentLimit: "24",
  currentSort: "hot",
  sorting: ["hot", "new", "rising", "controversial", "top", "gilded"],
  query: "",
  search: {
    string: "",
    open: false,
    time: ["year", "month", "week", "day", "hour"],
    currentTime: "",
    global: false
  },
  layouts: ["list", "th", "newspaper-o", "picture-o"],
  currentLayout: 0
};
