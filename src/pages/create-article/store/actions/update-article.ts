import type { Article } from "@/core/types/article";
import type { CreateArticleStore } from "../create-article-page.store";
import firebaseService from "@/shared/services/firebase/firebase-service";

const updateArticle =
  (get: () => CreateArticleStore) =>
  async (articleId: string): Promise<Article> => {
    const {
      state: { payload },
      actions: { clearPayload },
    } = get();

    const article = await firebaseService.updateArticle(articleId, payload);

    clearPayload();

    return article;
  };

export default updateArticle;
