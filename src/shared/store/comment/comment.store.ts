import type { Comment } from "@/core/types/comment";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import fetchComments from "./actions/fetch-comments";
import postComment from "./actions/post-comment";

interface CommentState {
  comments: {
    [key: string]: Comment;
  };
  articleComments: {
    [key: string]: string[];
  };
}

interface CommentActions {
  addComment: (comment: Comment | Comment[]) => void;
  fetchComments: (
    articleId: string,
    lastCreatedAt?: Date,
    pageSize?: number
  ) => Promise<void>;
  postComment: (articleId: string, comment: string) => Promise<void>;
}

export interface CommentStore {
  state: CommentState;
  actions: CommentActions;
}

const initialState: CommentState = {
  comments: {},
  articleComments: {},
};

const useCommentStore = create<CommentStore>()(
  immer((set, get) => ({
    state: initialState,
    actions: {
      addComment: (comment: Comment | Comment[]) => {
        set((state) => {
          if (Array.isArray(comment)) {
            comment.forEach((c) => {
              state.state.comments[c.id] = c;
            });
          } else {
            state.state.comments[comment.id] = comment;
          }
        });
      },
      fetchComments: fetchComments(set),
      postComment: postComment(set, get),
    },
  }))
);

export default useCommentStore;
