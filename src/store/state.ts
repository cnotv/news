import { State } from '@/types/state'

export const state: State = {
  after: '',
  currentSub: '',
  loading: false,
  posts: [],
  query: '',
  modal: {
    link: '',
    comments: '',
  },
  search: {
    currentTime: '',
    global: false,
    open: false,
    string: '',
  },
  settings: {
    layout: 0,
    limit: '24',
    sort: 'hot',
  },
  strict: process.env.NODE_ENV !== 'production',
  subreddits: [],
}
