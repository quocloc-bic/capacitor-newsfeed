import { useState } from "react";
import useAlertPresenter from "@/hooks/use-alert-presenter";
import { useHistory } from "react-router-dom";
import useCreateArticleStore from "./store/create-article-page.store";
import useNewsfeedStore from "../newsfeed/store/newsfeed-page.store";

const useCreateArticle = () => {
  const { showErrorAlert, showSuccessAlert } = useAlertPresenter();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { addArticleId } = useNewsfeedStore((state) => state.actions);

  const isValidPayload = useCreateArticleStore(
    (state) => state.state.isValidPayload
  );

  const triggerCreateArticle = useCreateArticleStore(
    (state) => state.actions.triggerCreateArticle
  );

  const onPost = async () => {
    try {
      setLoading(true);

      const article = await triggerCreateArticle();
      addArticleId(article.id);

      showSuccessAlert("Article created successfully");
      history.goBack();
    } catch (error) {
      showErrorAlert(error as string);
    } finally {
      setLoading(false);
    }
  };

  return { onPost, loading, isSubmitDisabled: !isValidPayload };
};

export default useCreateArticle;
