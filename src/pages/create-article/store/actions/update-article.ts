import type { Article } from "@/core/types/article";
import type { CreateArticleStore } from "../create-article-page.store";
import type { StoreGetFunction } from "@/shared/store/types/store.types";
import { repositories } from "@/shared/repositories";

const updateArticle =
  (get: StoreGetFunction<CreateArticleStore>) =>
  async (articleId: string): Promise<Partial<Article>> => {
    try {
      const {
        state: { payload },
        actions: { clearPayload },
      } = get();

      const article = await repositories.article.updateArticle(
        articleId,
        payload
      );

      clearPayload();

      return article;
    } catch (error) {
      console.error("Failed to update article:", error);
      throw error;
    }
  };

export default updateArticle;
