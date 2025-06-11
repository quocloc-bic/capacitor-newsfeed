import firebaseService from "@/shared/services/firebase/firebase-service";

const deleteArticle =
  (set: (state: any) => void) => async (articleId: string) => {
    await firebaseService.deleteArticle(articleId);

    set((state: any) => {
      delete state.state.articles[articleId];
    });
  };

export default deleteArticle;
