export interface NewsResponse {
  count: number;
  next: string;
  previous: string | null;
  results: News[];
}

export interface News {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: Date;
  updated_at: Date;
  featured: boolean;
  launches: Array<string>;
  events: Array<string>;
}
