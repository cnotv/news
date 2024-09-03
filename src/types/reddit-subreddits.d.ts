export interface Subreddits {
  account: null
  name: string
  authorFlair: AuthorFlair
  comments: AuthorFlair
  executed: AuthorFlair
  features: null
  listingOrder: ListingOrder[]
  postFlair: AuthorFlair
  postOrder: unknown[]
  posts: AuthorFlair
  preferences: null
  profileAboutInfo: AuthorFlair
  profiles: AuthorFlair
  queries: AuthorFlair
  searchDiscoveryUnitOrder: unknown[]
  searchDiscoveryUnits: AuthorFlair
  subredditAboutInfo: SubredditsInfoIndex
  subreddits: SubredditsIndex
  tokens: Tokens
  viewTreatment: string
}

export type SubredditsInfoIndex = { [key: string]: SubredditAboutInfo }
export type SubredditsIndex = { [key: string]: SubredditData }

export type AuthorFlair = unknown

export interface ListingOrder {
  type: string
  id: string
}

export interface ListingOrderType {
  Subreddit: string
}

export interface SubredditAboutInfo {
  accountsActive: null
  advertiserCategory: string[]
  allOriginalContent: boolean
  allowedPostTypes: AllowedPostTypes
  contentCategory?: string
  created: number
  disableContributorRequests: boolean
  emojisCustomSize?: number[]
  emojisEnabled: boolean
  isCrosspostableSubreddit: boolean
  originalContentTagEnabled: boolean
  publicDescription: string
  restrictCommenting: boolean
  restrictPosting: boolean
  showMedia: boolean
  submitLinkLabel: null | string
  submitTextLabel: null | string
  subscribers: number
  userIsBanned: boolean
  userIsContributor: null
  userIsSubscriber: null
  usingNewModmail: null
}

export interface AllowedPostTypes {
  images: boolean
  text: boolean
  videos: boolean
  links: boolean
  spoilers: boolean
}

export interface SubredditData {
  allowChatPostCreation: boolean
  communityIcon: string
  displayText: string
  freeFormReports?: boolean
  icon: Icon
  id: string
  isChatPostFeatureEnabled: boolean
  isNSFW: boolean
  isQuarantined: boolean
  name: string
  primaryColor: string
  subscribers: number
  title: string
  type: string
  url: string
  whitelistStatus: string
  wls: number | null
}

export interface Icon {
  url: string
  width: number | null
  height: number | null
}

export interface Tokens {
  listings: string
  posts: null
}
