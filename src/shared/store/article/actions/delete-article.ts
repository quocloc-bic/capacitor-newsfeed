import { repositories } from "@/shared/repositories";
import type { ArticleStore } from "../article.store";
import type { StoreSetFunction } from "../../types/store.types";

const deleteArticle =
  (set: StoreSetFunction<ArticleStore>) => async (articleId: string) => {
    try {
      await repositories.article.deleteArticle(articleId);

      set((state) => {
        delete state.state.articles[articleId];
      });
    } catch (error) {
      console.error("Failed to delete article:", error);
      throw error;
    }
  };

export default deleteArticle;
