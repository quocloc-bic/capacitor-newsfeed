import type { Article } from "@/core/types/article";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ArticleState {
  articles: {
    [key: string]: Article;
  };
}

interface ArticleActions {
  addArticle: (article: Article | Article[]) => void;
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
      addArticle: (article: Article | Article[]) => {
        set((state) => {
          if (Array.isArray(article)) {
            article.forEach((a) => {
              state.state.articles[a.id] = a;
            });
          } else {
            state.state.articles[article.id] = article;
          }
        });
      },
    },
  }))
);

export default useArticleStore;
