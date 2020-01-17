interface State {
  after?: string;
  currentSub: string;
  layouts: string[];
  limits: string[];
  loading: boolean;
  posts: Object[];
  query: string;
  search: StateSearch;
  settings: StateSettings;
  sorting: string[];
  strict: boolean;
  subreddits: string[];
}

interface StateSearch {
  string: string;
  open: boolean;
  time: string[];
  currentTime: string;
  global: boolean;
}

interface StateSettings {
  layout: number;
  limit: string;
  sort: string;
}
