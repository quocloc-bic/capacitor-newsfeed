import { useCallback, useEffect, useState } from "react";
import useCommentStore from "@/shared/store/comment/comment.store";
import commentSelectors from "@/shared/store/comment/comment.selector";
import { useShallow } from "zustand/react/shallow";
import { delay } from "@/shared/utils/globals";

const useNewsfeedItem = (articleId: string) => {
  const { fetchComments: fetchCommentsAction } = useCommentStore(
    (state) => state.actions
  );
  const commentIds = useCommentStore(
    useShallow(commentSelectors.getArticleComments(articleId))
  );

  const [loadingComments, setLoadingComments] = useState(false);

  const fetchComments = useCallback(async () => {
    try {
      setLoadingComments(true);
      await delay(500);
      await fetchCommentsAction(articleId, undefined, 2);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingComments(false);
    }
  }, [articleId]);

  useEffect(() => {
    fetchComments();
  }, [articleId, fetchComments]);

  return {
    loadingComments,
    commentIds,
  };
};

export default useNewsfeedItem;
