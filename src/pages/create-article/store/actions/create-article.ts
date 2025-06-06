import type { Article } from "@/types/acticle";
import type { CreateArticleStore } from "..";
import firebaseService from "@/services/firebase/firebase-service";

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
