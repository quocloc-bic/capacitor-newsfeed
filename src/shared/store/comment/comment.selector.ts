import type { CommentStore } from "./comment.store";

const getArticleComments = (articleId: string) => {
  return (state: CommentStore) => state.state.articleComments[articleId] || [];
};

const getComment = (commentId: string) => {
  return (state: CommentStore) => state.state.comments[commentId];
};

const commentSelectors = { getArticleComments, getComment };

export default commentSelectors;
