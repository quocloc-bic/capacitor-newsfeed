import { useState } from "react";
import useAlertPresenter from "@/hooks/use-alert-presenter";
import { useHistory } from "react-router-dom";
import useCreateArticleDomainService from "@/domain-services/create-article";

const useCreateArticle = () => {
  const { showErrorAlert, showSuccessAlert } = useAlertPresenter();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { onCreateArticle, isSubmitDisabled } = useCreateArticleDomainService();

  const onPost = async () => {
    try {
      setLoading(true);

      await onCreateArticle();
      showSuccessAlert("Article created successfully");
      history.goBack();
    } catch (error) {
      showErrorAlert(error as string);
    } finally {
      setLoading(false);
    }
  };

  return { onPost, loading, isSubmitDisabled };
};

export default useCreateArticle;
