import { useEffect, useCallback } from "react";
import useNewsfeedStore from "./store/newsfeed-page.store";
import useAlertPresenter from "@/shared/hooks/use-alert-presenter";
import useArticleStore from "@/shared/store/article/article.store";

const useNewsfeedPage = () => {
  const { showErrorAlert } = useAlertPresenter();

  const { articleIds, lastCreatedAt, loading, loadingMore } = useNewsfeedStore(
    (state) => state.state
  );

  const { fetchNewsfeed: fetchNewsfeedAction } = useNewsfeedStore(
    (state) => state.actions
  );

  const { addArticle: addArticleAction } = useArticleStore(
    (state) => state.actions
  );

  const fetchNewsfeed = useCallback(async (lastCreatedAt?: Date) => {
    try {
      const articles = await fetchNewsfeedAction(lastCreatedAt);

      addArticleAction(articles);
    } catch (error) {
      showErrorAlert(error);
    }
  }, []);

  const reload = useCallback(() => {
    fetchNewsfeed();
  }, [fetchNewsfeed]);

  const loadMore = useCallback(() => {
    if (loadingMore) return;
    fetchNewsfeed(lastCreatedAt);
  }, [loadingMore, lastCreatedAt, fetchNewsfeed]);

  useEffect(() => {
    reload();
  }, [reload]);

  return {
    articleIds,
    loading,
    loadingMore,
    loadMore,
    reload,
    lastCreatedAt,
  };
};

export default useNewsfeedPage;
