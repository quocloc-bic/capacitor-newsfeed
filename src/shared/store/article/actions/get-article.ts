import firebaseService from "@/shared/services/firebase/firebase-service";

const getArticle = (set: (state: any) => void) => async (articleId: string) => {
  const article = await firebaseService.getArticle(articleId);

  if (article) {
    set((state: any) => {
      state.state.articles[articleId] = article;
    });
  }

  return article;
};

export default getArticle;
