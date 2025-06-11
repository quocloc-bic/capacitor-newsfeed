import type { Article } from "@/core/types/article";
import type { CreateArticleStore } from "../create-article-page.store";
import { repositories } from "@/shared/repositories";

const updateArticle =
  (get: () => CreateArticleStore) =>
  async (articleId: string): Promise<Article> => {
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
