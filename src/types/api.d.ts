import { RedditPost } from './reddit-posts'

export interface Posts {
  posts: RedditPost[] | PostSub[]
  after: string
}

export interface PostSub {
  title: string
  description: string
  name: string
  subscribers: number
  categories: string
}
