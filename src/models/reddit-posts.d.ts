interface RedditResponse {
  kind: string
  data: RedditResponseData
}

interface RedditResponseData {
  after: null
  before: null
  children: Child[]
  dist: number
  facets: Facets
  modhash: string
}

interface Child {
  kind: string
  data: RedditPost
}

interface RedditPost {
  advertiser_category: string // Subreddit only?
  all_awardings: any[]
  allow_live_comments: boolean
  approved_at_utc: null
  approved_by: null
  archived: boolean
  author_flair_background_color: null | string
  author_flair_css_class: null
  author_flair_richtext: AuthorFlairRichtext[]
  author_flair_template_id: null | string
  author_flair_text_color: null | string
  author_flair_text: null | string
  author_flair_type: string
  author_fullname: string
  author_patreon_flair: boolean
  author_premium: boolean
  author: string
  awarders: any[]
  banned_at_utc: null
  banned_by: null
  can_gild: boolean
  can_mod_post: boolean
  category: null
  clicked: boolean
  content_categories: null
  contest_mode: boolean
  created_utc: number
  created: number
  display_name: string // Subreddit only?
  discussion_type: null
  distinguished: null
  domain: string
  downs: number
  edited: boolean | number
  gilded: number
  gildings: Facets
  hidden: boolean
  hide_score: boolean
  id: string
  is_crosspostable: boolean
  is_meta: boolean
  is_original_content: boolean
  is_reddit_media_domain: boolean
  is_robot_indexable: boolean
  is_self: boolean
  is_video: boolean
  likes: null
  link_flair_background_color: string
  link_flair_css_class: null | string
  link_flair_richtext: LinkFlairRichtext[]
  link_flair_template_id?: string
  link_flair_text_color: string
  link_flair_text: null | string
  link_flair_type: string
  locked: boolean
  media_embed: Facets
  media_only: boolean
  media: null
  mod_note: null
  mod_reason_by: null
  mod_reason_title: null
  mod_reports: any[]
  name: string
  no_follow: boolean
  num_comments: number
  num_crossposts: number
  num_reports: null
  over_18: boolean
  parent_whitelist_status: string
  permalink: string
  pinned: boolean
  post_hint?: string
  preview?: Preview
  public_description: string // Subreddit only?
  pwls: number
  quarantine: boolean
  removal_reason: null
  removed_by_category: null
  removed_by: null
  report_reasons: null
  saved: boolean
  score: number
  secure_media_embed: Facets
  secure_media: null
  selftext_html: null | string
  selftext: string
  send_replies: boolean
  spoiler: boolean
  steward_reports: any[]
  stickied: boolean
  subreddit_id: string
  subreddit_name_prefixed: string
  subreddit_subscribers: number
  subreddit_type: string
  subreddit: string
  subscribers: number // Subreddit only?
  suggested_sort: null
  thumbnail_height: number | null
  thumbnail_width: number | null
  thumbnail: string
  title: string
  total_awards_received: number
  ups: number
  url: string
  user_reports: any[]
  view_count: null
  visited: boolean
  whitelist_status: string
  wls: number
}

interface AuthorFlairRichtext {
  a: string
  e: string
  u: string
}

interface Facets {}

interface LinkFlairRichtext {
  e: string
  t: string
}

interface Preview {
  images: Image[]
  enabled: boolean
}

interface Image {
  source: Source
  resolutions: Source[]
  variants: Facets
  id: string
}

interface Source {
  url: string
  width: number
  height: number
}
