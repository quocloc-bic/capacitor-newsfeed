import type { Article } from "@/core/types/article";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import getArticle from "./actions/get-article";
import deleteArticle from "./actions/delete-article";

interface ArticleState {
  articles: {
    [key: string]: Article;
  };
}

interface ArticleActions {
  addArticle: (article: Article | Article[] | Partial<Article>) => void;
  getArticle: (articleId: string) => Promise<Article | undefined>;
  deleteArticle: (articleId: string) => Promise<void>;
}

export interface ArticleStore {
  state: ArticleState;
  actions: ArticleActions;
}

const initialState: ArticleState = {
  articles: {},
};

const useArticleStore = create<ArticleStore>()(
  immer((set) => ({
    state: initialState,
    actions: {
      addArticle: (article: Article | Article[] | Partial<Article>) => {
        set((state) => {
          if (Array.isArray(article)) {
            article.forEach((a) => {
              state.state.articles[a.id] = a;
            });
          } else if (typeof article === "object" && article !== null) {
            const articleId = article.id;
            if (articleId) {
              state.state.articles[articleId] = {
                ...state.state.articles[articleId],
                ...article,
              };
            }
          }
        });
      },
      getArticle: getArticle(set),
      deleteArticle: deleteArticle(set),
    },
  }))
);

export default useArticleStore;
