import { useCallback, useEffect, useState } from "react";
import useAlertPresenter from "@/shared/hooks/use-alert-presenter";
import { useHistory } from "react-router-dom";
import useCreateArticleStore from "./store/create-article-page.store";
import useNewsfeedStore from "../newsfeed/store/newsfeed-page.store";
import useArticleStore from "@/shared/store/article/article.store";
import articleSelectors from "@/shared/store/article/article.selector";
import { useShallow } from "zustand/react/shallow";
import { repositories } from "@/shared/repositories";
import type { CreateArticlePayload } from "@/core/types/create-article";

const useCreateArticle = (articleId?: string) => {
  const { showErrorAlert, showSuccessAlert } = useAlertPresenter();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const history = useHistory();

  const addArticleId = useNewsfeedStore(
    useCallback((state) => state.actions.addArticleId, [])
  );
  const addArticle = useArticleStore(
    useCallback((state) => state.actions.addArticle, [])
  );
  const getArticle = useArticleStore(
    useCallback((state) => state.actions.getArticle, [])
  );
  const article = useArticleStore(
    useShallow(articleSelectors.getArticle(articleId || ""))
  );

  const isValidPayload = useCreateArticleStore(
    (state) => state.state.isValidPayload
  );

  const setPayload = useCreateArticleStore(
    useCallback((state) => state.actions.setPayload, [])
  );
  const clearPayload = useCreateArticleStore(
    useCallback((state) => state.actions.clearPayload, [])
  );
  const triggerCreateArticle = useCreateArticleStore(
    useCallback((state) => state.actions.triggerCreateArticle, [])
  );
  const triggerUpdateArticle = useCreateArticleStore(
    useCallback((state) => state.actions.triggerUpdateArticle, [])
  );

  const [draft, setDraft] = useState<Partial<CreateArticlePayload> | undefined>(
    undefined
  );
  const [lastDraftSavedAt, setLastDraftSavedAt] = useState<Date | null>(null);

  useEffect(() => {
    if (!articleId) {
      repositories.draft.loadDraft().then((loaded) => {
        if (loaded) {
          setDraft(loaded);
          setPayload(loaded);
        }
      });
    }
  }, [articleId]);

  const handleClearDraft = useCallback(async () => {
    if (!articleId) {
      await repositories.draft.clearDraft();
    }
  }, [articleId]);

  useEffect(() => {
    if (article) {
      setPayload(article);
    }
  }, [article]);

  useEffect(() => {
    if (articleId) return;
    const updateLastSaved = (date: Date) => setLastDraftSavedAt(date);

    setTimeout(() => {
      repositories.draft.startAutoSaveDraft(
        () => useCreateArticleStore.getState().state.payload,
        updateLastSaved,
        1000
      );
    }, 500);
    return () => {
      repositories.draft.stopAutoSaveDraft();
    };
  }, [articleId]);

  const fetchArticle = useCallback(async () => {
    if (!articleId) {
      return;
    }
    setDataLoading(true);
    await getArticle(articleId);
    setDataLoading(false);
  }, [articleId, getArticle]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  const onPost = async () => {
    try {
      setSubmitLoading(true);
      const article = articleId
        ? await triggerUpdateArticle(articleId)
        : await triggerCreateArticle();
      if (article.id) {
        addArticleId(article.id);
        addArticle(article);
      }
      showSuccessAlert(
        articleId
          ? textConstants.articleUpdatedSuccessfully
          : textConstants.articleCreatedSuccessfully
      );
      if (!articleId) await handleClearDraft();
      history.goBack();
    } catch (error) {
      showErrorAlert(error as string);
    } finally {
      setSubmitLoading(false);
    }
  };

  const onClose = useCallback(() => {
    repositories.draft.clearDraft();
    clearPayload();
    history.goBack();
  }, []);

  return {
    onPost,
    onClose,
    dataLoading,
    submitLoading,
    isSubmitDisabled: !isValidPayload,
    article,
    ...(articleId
      ? {}
      : {
          draft,
          lastDraftSavedAt,
        }),
  };
};

export default useCreateArticle;

const textConstants = {
  articleUpdatedSuccessfully: "Article updated successfully",
  articleCreatedSuccessfully: "Article created successfully",
};
