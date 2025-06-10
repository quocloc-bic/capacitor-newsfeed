import { useCallback, useEffect, useState } from "react";
import useAlertPresenter from "@/shared/hooks/use-alert-presenter";
import { useHistory } from "react-router-dom";
import useCreateArticleStore from "./store/create-article-page.store";
import useNewsfeedStore from "../newsfeed/store/newsfeed-page.store";
import useArticleStore from "@/shared/store/article/article.store";
import articleSelectors from "@/shared/store/article/article.selector";
import { useShallow } from "zustand/react/shallow";

const useCreateArticle = (articleId?: string) => {
  const { showErrorAlert, showSuccessAlert } = useAlertPresenter();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const history = useHistory();

  const { addArticleId } = useNewsfeedStore((state) => state.actions);
  const { addArticle, getArticle } = useArticleStore((state) => state.actions);
  const article = useArticleStore(
    useShallow(articleSelectors.getArticle(articleId || ""))
  );

  const isValidPayload = useCreateArticleStore(
    (state) => state.state.isValidPayload
  );

  const triggerCreateArticle = useCreateArticleStore(
    (state) => state.actions.triggerCreateArticle
  );
  const triggerUpdateArticle = useCreateArticleStore(
    (state) => state.actions.triggerUpdateArticle
  );

  const fetchArticle = useCallback(async () => {
    if (!articleId) {
      return;
    }

    setDataLoading(true);
    await getArticle(articleId);
    setDataLoading(false);
  }, [articleId]);

  useEffect(() => {
    fetchArticle();
  }, [articleId]);

  const onPost = async () => {
    try {
      setSubmitLoading(true);

      const article = articleId
        ? await triggerUpdateArticle(articleId)
        : await triggerCreateArticle();

      addArticleId(article.id);
      addArticle(article);

      showSuccessAlert(
        articleId
          ? textConstants.articleUpdatedSuccessfully
          : textConstants.articleCreatedSuccessfully
      );
      history.goBack();
    } catch (error) {
      showErrorAlert(error as string);
    } finally {
      setSubmitLoading(false);
    }
  };

  return {
    onPost,
    dataLoading,
    submitLoading,
    isSubmitDisabled: !isValidPayload,
    article,
  };
};

export default useCreateArticle;

const textConstants = {
  articleUpdatedSuccessfully: "Article updated successfully",
  articleCreatedSuccessfully: "Article created successfully",
};
