import { State } from '@/types/state'

export const getPosts = (state: State) => state.posts
export const getSubreddits = (state: State) => state.subreddits
export const getSearch = (state: State) => state.search
export const getQuery = (state: State) => state.query
export const getLimit = (state: State) => state.settings[state.currentSub || 'default'].limit
export const getCurrentSub = (state: State) => state.currentSub
export const getSort = (state: State) => state.settings[state.currentSub || 'default'].sort
export const getLayout = (state: State) => state.settings[state.currentSub || 'default'].layout
export const isLoading = (state: State) => state.loading
