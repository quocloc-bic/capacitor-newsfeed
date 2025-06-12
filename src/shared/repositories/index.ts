import type { ArticleRepository } from "./interfaces/article-repository.interface";
import type { CommentRepository } from "./interfaces/comment-repository.interface";
import { FirebaseArticleRepository } from "./implementations/firebase-article.repository";
import { FirebaseCommentRepository } from "./implementations/firebase-comment.repository";
import type { DraftRepository } from "./interfaces/draft-repository.interface";
import { LocalDraftRepository } from "./implementations/local-draft.repository";

export class RepositoryContainer {
  private static _articleRepository: ArticleRepository;
  private static _commentRepository: CommentRepository;
  private static _draftRepository: DraftRepository;

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

  static get draftRepository(): DraftRepository {
    if (!this._draftRepository) {
      this._draftRepository = new LocalDraftRepository();
    }
    return this._draftRepository;
  }

  static setArticleRepository(repository: ArticleRepository): void {
    this._articleRepository = repository;
  }

  static setCommentRepository(repository: CommentRepository): void {
    this._commentRepository = repository;
  }

  static setDraftRepository(repository: DraftRepository): void {
    this._draftRepository = repository;
  }
}

export const repositories = {
  get article(): ArticleRepository {
    return RepositoryContainer.articleRepository;
  },
  get comment(): CommentRepository {
    return RepositoryContainer.commentRepository;
  },
  get draft(): DraftRepository {
    return RepositoryContainer.draftRepository;
  },
};

export { FirebaseArticleRepository } from "./implementations/firebase-article.repository";
export { FirebaseCommentRepository } from "./implementations/firebase-comment.repository";
export { LocalDraftRepository } from "./implementations/local-draft.repository";
export type { ArticleRepository } from "./interfaces/article-repository.interface";
export type { CommentRepository } from "./interfaces/comment-repository.interface";
export type { DraftRepository } from "./interfaces/draft-repository.interface";
