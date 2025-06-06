import { useEffect, useCallback } from "react";
import useNewsfeedStore from "./store";
import useAlertPresenter from "@/hooks/use-alert-presenter";

const useNewsfeedPage = () => {
  const { showErrorAlert } = useAlertPresenter();
  const { articles, lastCreatedAt, loading, loadingMore, refreshing } =
    useNewsfeedStore((state) => state.state);

  const { fetchNewsfeed: fetchNewsfeedAction } = useNewsfeedStore(
    (state) => state.actions
  );

  const fetchNewsfeed = useCallback(async (lastCreatedAt?: Date) => {
    try {
      await fetchNewsfeedAction(lastCreatedAt);
    } catch (error) {
      showErrorAlert(error as string);
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
    articles,
    loading,
    loadingMore,
    loadMore,
    reload,
    refreshing,
    lastCreatedAt,
  };
};

export default useNewsfeedPage;
