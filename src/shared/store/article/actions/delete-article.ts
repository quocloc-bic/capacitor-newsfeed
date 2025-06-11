import { repositories } from "@/shared/repositories";

const deleteArticle =
  (set: (state: any) => void) => async (articleId: string) => {
    try {
      await repositories.article.deleteArticle(articleId);

      set((state: any) => {
        delete state.state.articles[articleId];
      });
    } catch (error) {
      console.error("Failed to delete article:", error);
      throw error;
    }
  };

export default deleteArticle;
