import type { CreateArticleStore } from "..";
import firebaseService from "@/services/firebase/firebase-service";

const createArticle = (get: () => CreateArticleStore) => async () => {
  const {
    state: { payload },
    actions: { clearPayload },
  } = get();

  const articleId = await firebaseService.postArticle(payload);

  clearPayload();

  return articleId;
};

export default createArticle;
