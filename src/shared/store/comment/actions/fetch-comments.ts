import firebaseService from "@/shared/services/firebase/firebase-service";

const fetchComments =
  (set: (state: any) => void) =>
  async (articleId: string, lastCreatedAt?: Date, pageSize?: number) => {
    const fetchedComments = await firebaseService.getComments(
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
  };

export default fetchComments;
