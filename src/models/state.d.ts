interface State {
  strict: boolean;
  posts: Object[];
  after?: string;
  loading: boolean;
  subreddits: string[];
  currentSub: string;
  limits: string[];
  currentLimit: string;
  currentSort: string;
  sorting: string[];
  query: string;
  search: StateSearch;
  layouts: string[];
  currentLayout: number;
}

interface StateSearch {
  string: string;
  open: boolean;
  sub: boolean;
  time: string[];
  currentTime: string;
  global: boolean;
}
