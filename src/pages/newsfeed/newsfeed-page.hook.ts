import { useEffect, useState, useCallback } from "react";

const PAGE_SIZE = 10;

export interface Article {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  coverUrl: string;
}

function generateMockArticle(id: number): Article {
  return {
    id,
    author: `User ${id}`,
    content: `This is a mock post #${id}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    createdAt: new Date(Date.now() - id * 1000 * 60).toISOString(),
    coverUrl: `https://picsum.photos/seed/newsfeed${id}/840/360`, // 21:9 ratio (840x360)
  };
}

const useNewsfeedPage = () => {
  const [items, setItems] = useState<Article[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Initial load
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const newItems = Array.from({ length: PAGE_SIZE }, (_, i) =>
        generateMockArticle(i + 1)
      );
      setItems(newItems);
      setPage(1);
      setLoading(false);
      setHasMore(true);
    }, 1000);
  }, []);

  // Load more items
  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const newItems = Array.from({ length: PAGE_SIZE }, (_, i) =>
        generateMockArticle(nextPage * PAGE_SIZE + i + 1)
      );
      setItems((prev) => [...prev, ...newItems]);
      setPage(nextPage);
      setLoadingMore(false);
      // Simulate end after 5 pages
      if (nextPage >= 5) setHasMore(false);
    }, 1000);
  }, [loadingMore, hasMore, page]);

  // Reload (pull-to-refresh)
  const reload = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      const newItems = Array.from({ length: PAGE_SIZE }, (_, i) =>
        generateMockArticle(i + 1)
      );
      setItems(newItems);
      setPage(1);
      setHasMore(true);
      setRefreshing(false);
    }, 1000);
  }, []);

  return { items, loading, loadingMore, hasMore, loadMore, reload, refreshing };
};

export default useNewsfeedPage;
