import { repositories } from "@/shared/repositories";
import type { ArticleStore } from "../article.store";
import type { StoreSetFunction } from "../../types/store.types";

const getArticle =
  (set: StoreSetFunction<ArticleStore>) => async (articleId: string) => {
    try {
      const article = await repositories.article.getArticle(articleId);

      if (article) {
        set((state) => {
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
