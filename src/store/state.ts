export default {
  after: "",
  currentSub: "",
  layouts: ["list", "th", "newspaper-o", "picture-o"],
  limits: ["12", "24", "48", "96"],
  loading: false,
  posts: [],
  query: "",
  search: {
    currentTime: "",
    global: false,
    open: false,
    string: "",
    time: ["year", "month", "week", "day", "hour"]
  },
  settings: {
    layout: 0,
    limit: "24",
    sort: "hot"
  },
  sorting: ["hot", "new", "rising", "controversial", "top", "gilded"],
  strict: process.env.NODE_ENV !== "production",
  subreddits: []
};
