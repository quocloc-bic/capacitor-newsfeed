import type { Article } from "@/types/acticle";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import fetchNewsfeed from "./actions/fetch-newsfeed";

interface NewsfeedState {
  articles: Article[];
  lastCreatedAt: Date | undefined;
  hasMore: boolean;
  loading: boolean;
  loadingMore: boolean;
  refreshing: boolean;
}

interface NewsfeedActions {
  fetchNewsfeed: (lastCreatedAt?: Date) => void;
}

export interface NewsfeedStore {
  state: NewsfeedState;
  actions: NewsfeedActions;
}

const initialState: NewsfeedState = {
  articles: [],
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
    },
  }))
);

export default useNewsfeedStore;
