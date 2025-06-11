import { repositories } from "@/shared/repositories";

const postComment =
  (set: (state: any) => void, get: () => any) =>
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

      set((state: any) => {
        state.state.articleComments[articleId] = newArticleComments;
        state.state.comments[newComment.id] = newComment;
      });
    } catch (error) {
      console.error("Failed to post comment:", error);
      throw error;
    }
  };

export default postComment;
