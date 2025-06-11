import type { Article } from "@/core/types/article";
import type { CreateArticlePayload } from "@/core/types/create-acticle";

export interface ArticleRepository {
  getArticles(
    lastCreatedAt?: Date,
    pageSize?: number
  ): Promise<{
    articles: Article[];
    lastCreatedAt?: Date;
  }>;

  getArticle(articleId: string): Promise<Article | undefined>;

  createArticle(payload: CreateArticlePayload): Promise<Article>;

  updateArticle(
    articleId: string,
    payload: CreateArticlePayload
  ): Promise<Article>;

  deleteArticle(articleId: string): Promise<void>;
}

export type ArticleRepositoryType = ArticleRepository;
