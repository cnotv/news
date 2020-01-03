interface State {
  strict:        boolean;
  posts:         Object[];
  after?:        string;
  loading:       boolean;
  subreddits:    string[];
  currentSub:    string;
  limits:        string[];
  currentLimit:  string;
  currentOrder:  string;
  order:         string[];
  query:         string;
  search:        StateSearch;
  layout:        string[];
  currentLayout: number;
}

interface StateSearch {
  string:      string;
  open:        boolean;
  sub:         boolean;
  time:        string[];
  timecurrent: string;
  global:      boolean;
}