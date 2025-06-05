import { useState } from "react";
import useCreateArticleStore from "./store";
import useAlertPresenter from "@/hooks/use-alert-presenter";
import { useHistory } from "react-router-dom";

const useCreateArticle = () => {
  const { showErrorAlert, showSuccessAlert } = useAlertPresenter();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const isValidPayload = useCreateArticleStore(
    (state) => state.state.isValidPayload
  );

  const triggerCreateArticle = useCreateArticleStore(
    (state) => state.actions.triggerCreateArticle
  );

  const onPost = async () => {
    try {
      setLoading(true);

      await triggerCreateArticle();
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
