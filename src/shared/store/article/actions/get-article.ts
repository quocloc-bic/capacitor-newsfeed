import { repositories } from "@/shared/repositories";

const getArticle = (set: (state: any) => void) => async (articleId: string) => {
  try {
    const article = await repositories.article.getArticle(articleId);

    if (article) {
      set((state: any) => {
        state.state.articles[articleId] = article;
      });
    }

    return article;
  } catch (error) {
    console.error("Failed to get article:", error);
    throw error;
  }
};

export default getArticle;
