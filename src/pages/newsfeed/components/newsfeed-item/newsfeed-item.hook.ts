import { useCallback, useEffect, useState } from "react";
import useCommentStore from "@/store/comment/comment.store";

const useNewsfeedItem = (articleId: string) => {
  const { fetchComments: fetchCommentsAction } = useCommentStore(
    (state) => state.actions
  );
  const { articleComments } = useCommentStore((state) => state.state);

  const [loadingComments, setLoadingComments] = useState(false);

  const fetchComments = useCallback(async () => {
    try {
      setLoadingComments(true);
      await fetchCommentsAction(articleId, undefined, 2);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingComments(false);
    }
  }, [articleId, fetchCommentsAction]);

  useEffect(() => {
    fetchComments();
  }, [articleId, fetchComments]);

  return {
    loadingComments,
    commentIds: articleComments[articleId] || [],
  };
};

export default useNewsfeedItem;
