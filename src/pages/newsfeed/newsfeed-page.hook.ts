import { useEffect, useCallback } from "react";
import useNewsfeedStore from "./store";

const useNewsfeedPage = () => {
  const { articles, lastCreatedAt, loading, loadingMore, refreshing } =
    useNewsfeedStore((state) => state.state);

  const { fetchNewsfeed } = useNewsfeedStore((state) => state.actions);

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
