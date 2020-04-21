interface State {
  after?: string;
  currentSub: string;
  loading: boolean;
  posts: Object[];
  query: string;
  search: StateSearch;
  settings: StateSettings;
  strict: boolean;
  subreddits: string[];
}

interface StateSearch {
  string: string;
  open: boolean;
  currentTime: string;
  global: boolean;
}

interface StateSettings {
  layout: number;
  limit: string;
  sort: string;
}
