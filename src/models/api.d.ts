interface Posts {
  posts: RedditPost[] | PostSub[];
  after: string;
}

interface PostSub {
  title: string;
  description: string;
  name: string;
  subscribers: number;
  categories: string[];
}
