import type { ArticleRepository } from "./interfaces/article-repository.interface";
import type { CommentRepository } from "./interfaces/comment-repository.interface";
import { FirebaseArticleRepository } from "./implementations/firebase-article.repository";
import { FirebaseCommentRepository } from "./implementations/firebase-comment.repository";

export class RepositoryContainer {
  private static _articleRepository: ArticleRepository;
  private static _commentRepository: CommentRepository;

  static get articleRepository(): ArticleRepository {
    if (!this._articleRepository) {
      this._articleRepository = new FirebaseArticleRepository();
    }
    return this._articleRepository;
  }

  static get commentRepository(): CommentRepository {
    if (!this._commentRepository) {
      this._commentRepository = new FirebaseCommentRepository();
    }
    return this._commentRepository;
  }

  static setArticleRepository(repository: ArticleRepository): void {
    this._articleRepository = repository;
  }

  static setCommentRepository(repository: CommentRepository): void {
    this._commentRepository = repository;
  }
}

export const repositories = {
  get article(): ArticleRepository {
    return RepositoryContainer.articleRepository;
  },
  get comment(): CommentRepository {
    return RepositoryContainer.commentRepository;
  },
};

export { FirebaseArticleRepository } from "./implementations/firebase-article.repository";
export { FirebaseCommentRepository } from "./implementations/firebase-comment.repository";
export type { ArticleRepository } from "./interfaces/article-repository.interface";
export type { CommentRepository } from "./interfaces/comment-repository.interface";
