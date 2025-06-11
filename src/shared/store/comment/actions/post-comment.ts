import { repositories } from "@/shared/repositories";
import type { CommentStore } from "../comment.store";
import type {
  StoreSetFunction,
  StoreGetFunction,
} from "../../types/store.types";

const postComment =
  (set: StoreSetFunction<CommentStore>, get: StoreGetFunction<CommentStore>) =>
  async (articleId: string, comment: string) => {
    try {
      const {
        state: { articleComments },
      } = get();

      const newComment = await repositories.comment.createComment(
        articleId,
        comment
      );

      const currentArticleComments =
        (articleComments && articleComments[articleId]) || [];
      const newArticleComments = [newComment.id, ...currentArticleComments];

      set((state) => {
        state.state.articleComments[articleId] = newArticleComments;
        state.state.comments[newComment.id] = newComment;
      });
    } catch (error) {
      console.error("Failed to post comment:", error);
      throw error;
    }
  };

export default postComment;
