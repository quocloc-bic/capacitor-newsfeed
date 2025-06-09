import articleSelectors from "@/shared/store/article/article.selector";
import useArticleStore from "@/shared/store/article/article.store";
import { delay } from "@/shared/utils/globals";
import { useCallback, useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

const useArticleDetailPage = (articleId: string) => {
  const [loading, setLoading] = useState(true);
  const article = useArticleStore(
    useShallow(articleSelectors.getArticle(articleId))
  );
  const { getArticle } = useArticleStore(useShallow((state) => state.actions));

  const fetchArticle = useCallback(async (articleId: string) => {
    try {
      setLoading(true);
      await delay(1000);
      await getArticle(articleId);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (articleId) {
      fetchArticle(articleId);
    }
  }, [articleId]);

  return {
    article,
    loading,
    fetchArticle,
  };
};

export default useArticleDetailPage;
