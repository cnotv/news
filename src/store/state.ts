import type { State } from '@/types/state'

export const state: State = {
  after: '',
  currentSub: '',
  loading: false,
  posts: [],
  query: '',
  modal: {
    source: '',
    link: '',
    comments: ''
  },
  search: {
    currentTime: '',
    global: false,
    open: false,
    string: ''
  },
  settings: {
    default: {
      layout: 0,
      limit: '24',
      sort: 'hot'
    }
  },
  strict: process.env.NODE_ENV !== 'production',
  subreddits: []
}
