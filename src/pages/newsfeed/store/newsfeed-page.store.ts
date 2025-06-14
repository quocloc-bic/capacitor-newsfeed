import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import fetchNewsfeed from "./actions/fetch-newsfeed";
import type { Article } from "@/core/types/article";

interface NewsfeedState {
  articleIds: string[];
  lastCreatedAt: Date | undefined;
  loading: boolean;
  loadingMore: boolean;
}

interface NewsfeedActions {
  fetchNewsfeed: (lastCreatedAt?: Date) => Promise<Article[]>;
  addArticleId: (articleId: string) => void;
  removeArticleId: (articleId: string) => void;
}

export interface NewsfeedStore {
  state: NewsfeedState;
  actions: NewsfeedActions;
}

const initialState: NewsfeedState = {
  articleIds: [],
  lastCreatedAt: undefined,
  loading: true,
  loadingMore: false,
};

const useNewsfeedStore = create<NewsfeedStore>()(
  immer((set, get) => ({
    state: initialState,
    actions: {
      fetchNewsfeed: fetchNewsfeed(set, get),
      addArticleId: (articleId: string) => {
        set((state) => {
          state.state.articleIds = Array.from(
            new Set([articleId, ...state.state.articleIds])
          );
        });
      },
      removeArticleId: (articleId: string) => {
        set((state) => {
          state.state.articleIds = state.state.articleIds.filter(
            (id) => id !== articleId
          );
        });
      },
    },
  }))
);

export default useNewsfeedStore;
