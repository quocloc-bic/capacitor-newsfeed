import type { Article } from "@/core/types/article";
import type { CreateArticlePayload } from "@/core/types/create-acticle";
import type { ArticleRepository } from "../interfaces/article-repository.interface";
import firebaseService from "@/shared/services/firebase/firebase-service";

export class FirebaseArticleRepository implements ArticleRepository {
  async getArticles(
    lastCreatedAt?: Date,
    pageSize?: number
  ): Promise<{
    articles: Article[];
    lastCreatedAt?: Date;
  }> {
    try {
      return await firebaseService.getArticles(lastCreatedAt, pageSize);
    } catch (error) {
      console.error("FirebaseArticleRepository.getArticles failed:", error);
      throw new Error("Failed to fetch articles");
    }
  }

  async getArticle(articleId: string): Promise<Article | undefined> {
    try {
      return await firebaseService.getArticle(articleId);
    } catch (error) {
      console.error("FirebaseArticleRepository.getArticle failed:", error);
      throw new Error(`Failed to fetch article with id: ${articleId}`);
    }
  }

  async createArticle(payload: CreateArticlePayload): Promise<Article> {
    try {
      return await firebaseService.postArticle(payload);
    } catch (error) {
      console.error("FirebaseArticleRepository.createArticle failed:", error);
      throw new Error("Failed to create article");
    }
  }

  async updateArticle(
    articleId: string,
    payload: CreateArticlePayload
  ): Promise<Article> {
    try {
      return await firebaseService.updateArticle(articleId, payload);
    } catch (error) {
      console.error("FirebaseArticleRepository.updateArticle failed:", error);
      throw new Error(`Failed to update article with id: ${articleId}`);
    }
  }

  async deleteArticle(articleId: string): Promise<void> {
    try {
      await firebaseService.deleteArticle(articleId);
    } catch (error) {
      console.error("FirebaseArticleRepository.deleteArticle failed:", error);
      throw new Error(`Failed to delete article with id: ${articleId}`);
    }
  }
}
