import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import fetchNewsfeed from "./actions/fetch-newsfeed";
import type { Article } from "@/types/acticle";

interface NewsfeedState {
  articleIds: string[];
  lastCreatedAt: Date | undefined;
  hasMore: boolean;
  loading: boolean;
  loadingMore: boolean;
  refreshing: boolean;
}

interface NewsfeedActions {
  fetchNewsfeed: (lastCreatedAt?: Date) => Promise<Article[]>;
  addArticleId: (articleId: string) => void;
}

export interface NewsfeedStore {
  state: NewsfeedState;
  actions: NewsfeedActions;
}

const initialState: NewsfeedState = {
  articleIds: [],
  lastCreatedAt: undefined,
  hasMore: true,
  loading: true,
  loadingMore: false,
  refreshing: false,
};

const useNewsfeedStore = create<NewsfeedStore>()(
  immer((set, get) => ({
    state: initialState,
    actions: {
      fetchNewsfeed: fetchNewsfeed(set, get),
      addArticleId: (articleId: string) => {
        set((state) => {
          state.state.articleIds.unshift(articleId);
        });
      },
    },
  }))
);

export default useNewsfeedStore;
