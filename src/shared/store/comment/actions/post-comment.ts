import firebaseService from "@/shared/services/firebase/firebase-service";

const postComment =
  (set: (state: any) => void, get: () => any) =>
  async (articleId: string, comment: string) => {
    const {
      state: { articleComments },
    } = get();

    const newComment = await firebaseService.postComment(articleId, comment);

    const currentArticleComments =
      (articleComments && articleComments[articleId]) || [];
    const newArticleComments = [newComment.id, ...currentArticleComments];

    set((state: any) => {
      state.state.articleComments[articleId] = newArticleComments;
      state.state.comments[newComment.id] = newComment;
    });
  };

export default postComment;
