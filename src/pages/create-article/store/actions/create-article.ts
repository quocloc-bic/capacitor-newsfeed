import type { Article } from "@/core/types/article";
import type { CreateArticleStore } from "../create-article-page.store";
import type { StoreGetFunction } from "@/shared/store/types/store.types";
import { repositories } from "@/shared/repositories";

const createArticle =
  (get: StoreGetFunction<CreateArticleStore>) => async (): Promise<Article> => {
    try {
      const {
        state: { payload },
        actions: { clearPayload },
      } = get();

      const article = await repositories.article.createArticle(payload);

      clearPayload();

      return article;
    } catch (error) {
      console.error("Failed to create article:", error);
      throw error;
    }
  };

export default createArticle;
