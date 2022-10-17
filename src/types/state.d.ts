import { PostSub } from './api'
import { RedditPost } from './reddit-posts'

export interface State {
  after?: string
  currentSub: string
  loading: boolean
  modal: Modal
  posts: (RedditPost | PostSub)[]
  query: string
  search: StateSearch
  settings: StateSettings
  strict: boolean
  subreddits: string[]
}

export interface Modal {
  open: boolean
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
