export interface State {
  after?: string
  currentSub: string
  loading: boolean
  modal: Modal | undefined
  posts: (RedditPost | PostSub)[]
  query: string
  search: StateSearch
  settings: Record<string, StateSettings>
  strict: boolean
  subreddits: Subreddit[]
}

export interface Modal {
  source: string
  link: string
  comments: string
}

export interface StateSearch {
  string: string
  open: boolean
  currentTime: string
  global: boolean
}

export interface StateSettings {
  layout: number
  limit: string
  sort: string
}

export interface Subreddit {
  id: string
  name: string
}
