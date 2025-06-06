import type { Article } from "@/core/types/article";
import type { CreateArticleStore } from "../create-article-page.store";
import firebaseService from "@/shared/services/firebase/firebase-service";

const createArticle =
  (get: () => CreateArticleStore) => async (): Promise<Article> => {
    const {
      state: { payload },
      actions: { clearPayload },
    } = get();

    const article = await firebaseService.postArticle(payload);

    clearPayload();

    return article;
  };

export default createArticle;
