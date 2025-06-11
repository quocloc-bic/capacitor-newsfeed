import { repositories } from "@/shared/repositories";

const fetchComments =
  (set: (state: any) => void) =>
  async (articleId: string, lastCreatedAt?: Date, pageSize?: number) => {
    try {
      const fetchedComments = await repositories.comment.getComments(
        articleId,
        lastCreatedAt,
        pageSize
      );

      set((state: any) => {
        fetchedComments.forEach((c) => {
          state.state.comments[c.id] = c;
        });

        if (lastCreatedAt) {
          state.state.articleComments[articleId] = [
            ...(state.state.articleComments[articleId] || []),
            ...fetchedComments.map((comment) => comment.id),
          ];
        } else {
          state.state.articleComments[articleId] = fetchedComments.map(
            (comment) => comment.id
          );
        }
      });
    } catch (error) {
      console.error("Failed to fetch comments:", error);
      throw error;
    }
  };

export default fetchComments;
