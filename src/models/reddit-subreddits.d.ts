interface Subreddits {
  account: null;
  authorFlair: AuthorFlair;
  comments: AuthorFlair;
  executed: AuthorFlair;
  features: null;
  listingOrder: ListingOrder[];
  postFlair: AuthorFlair;
  postOrder: any[];
  posts: AuthorFlair;
  preferences: null;
  profileAboutInfo: AuthorFlair;
  profiles: AuthorFlair;
  queries: AuthorFlair;
  searchDiscoveryUnitOrder: any[];
  searchDiscoveryUnits: AuthorFlair;
  subredditAboutInfo: SubredditsInfoIndex;
  subreddits: SubredditsIndex;
  tokens: Tokens;
  viewTreatment: string;
}

type SubredditsInfoIndex = { [key: string]: SubredditAboutInfo };
type SubredditsIndex = { [key: string]: Subreddit };

interface AuthorFlair {}

interface ListingOrder {
  type: string;
  id: string;
}

interface ListingOrderType {
  Subreddit: string;
}

interface SubredditAboutInfo {
  accountsActive: null;
  advertiserCategory: string[];
  allOriginalContent: boolean;
  allowedPostTypes: AllowedPostTypes;
  contentCategory?: string;
  created: number;
  disableContributorRequests: boolean;
  emojisCustomSize?: number[];
  emojisEnabled: boolean;
  isCrosspostableSubreddit: boolean;
  originalContentTagEnabled: boolean;
  publicDescription: string;
  restrictCommenting: boolean;
  restrictPosting: boolean;
  showMedia: boolean;
  submitLinkLabel: null | string;
  submitTextLabel: null | string;
  subscribers: number;
  userIsBanned: boolean;
  userIsContributor: null;
  userIsSubscriber: null;
  usingNewModmail: null;
}

interface AllowedPostTypes {
  images: boolean;
  text: boolean;
  videos: boolean;
  links: boolean;
  spoilers: boolean;
}

interface Subreddit {
  allowChatPostCreation: boolean;
  communityIcon: string;
  displayText: string;
  freeFormReports?: boolean;
  icon: Icon;
  id: string;
  isChatPostFeatureEnabled: boolean;
  isNSFW: boolean;
  isQuarantined: boolean;
  name: string;
  primaryColor: string;
  subscribers: number;
  title: string;
  type: string;
  url: string;
  whitelistStatus: string;
  wls: number | null;
}

interface Icon {
  url: string;
  width: number | null;
  height: number | null;
}

interface Tokens {
  listings: string;
  posts: null;
}
