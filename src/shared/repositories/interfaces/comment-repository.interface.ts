import type { Comment } from "@/core/types/comment";

export interface CommentRepository {
  getComments(
    articleId: string,
    lastCreatedAt?: Date,
    pageSize?: number
  ): Promise<Comment[]>;

  createComment(articleId: string, comment: string): Promise<Comment>;
}

export type CommentRepositoryType = CommentRepository;
