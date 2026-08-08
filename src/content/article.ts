export type ArticleStatus = "draft" | "published" | "archived";

export type ArticleSeo = {
  title?: string;
  description?: string;
  canonicalPath?: string;
  noIndex?: boolean;
  socialImage?: string;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt?: string;
  updatedAt: string;
  status: ArticleStatus;
  seo?: ArticleSeo;
};

export type ArticleSummary = Pick<
  Article,
  | "id"
  | "slug"
  | "title"
  | "description"
  | "author"
  | "category"
  | "tags"
  | "publishedAt"
  | "updatedAt"
>;
