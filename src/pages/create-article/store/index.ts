import { isEqual } from "lodash";
import { create } from "zustand";
import type { CreateArticlePayload } from "@/types/create-acticle";
import { immer } from "zustand/middleware/immer";
import createArticle from "./actions/create-article";

interface CreateArticleState {
  payload: CreateArticlePayload;
  isValidPayload: boolean;
}

interface CreateArticleActions {
  setPayload: (payload: Partial<CreateArticlePayload>) => void;
  triggerCreateArticle: () => Promise<string>;
  clearPayload: () => void;
}

export interface CreateArticleStore {
  state: CreateArticleState;
  actions: CreateArticleActions;
}

const initialState: CreateArticleState = {
  payload: {
    title: "",
    description: "",
    content: "",
    coverImage: "",
  },
  isValidPayload: false,
};

const useCreateArticleStore = create<CreateArticleStore>()(
  immer((set, get) => ({
    state: initialState,
    actions: {
      setPayload: (payload) => {
        const {
          state: { payload: currentPayload },
        } = get();

        const newPayload = { ...currentPayload, ...payload };
        if (isEqual(currentPayload, newPayload)) {
          return;
        }

        const isValidPayload = Object.values(newPayload).every(
          (value) => value !== ""
        );

        set((state) => {
          state.state.payload = newPayload;
          state.state.isValidPayload = isValidPayload;
        });
      },
      triggerCreateArticle: createArticle(get),
      clearPayload: () => {
        set((state) => {
          state.state.payload = initialState.payload;
          state.state.isValidPayload = initialState.isValidPayload;
        });
      },
    },
  }))
);

export default useCreateArticleStore;
