import type { Comment } from "@/core/types/comment";
import type { CommentRepository } from "../interfaces/comment-repository.interface";
import firebaseService from "@/shared/services/firebase/firebase-service";

export class FirebaseCommentRepository implements CommentRepository {
  async getComments(
    articleId: string,
    lastCreatedAt?: Date,
    pageSize?: number
  ): Promise<Comment[]> {
    try {
      return await firebaseService.getComments(
        articleId,
        lastCreatedAt,
        pageSize
      );
    } catch (error) {
      console.error("FirebaseCommentRepository.getComments failed:", error);
      throw new Error(`Failed to fetch comments for article: ${articleId}`);
    }
  }

  async createComment(articleId: string, comment: string): Promise<Comment> {
    try {
      return await firebaseService.postComment(articleId, comment);
    } catch (error) {
      console.error("FirebaseCommentRepository.createComment failed:", error);
      throw new Error(`Failed to create comment for article: ${articleId}`);
    }
  }
}
