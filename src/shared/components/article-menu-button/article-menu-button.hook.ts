import { useHistory } from "react-router-dom";
import { AppRoutes, appRoutesFactory } from "@/core/app-routes";
import type { Article } from "@/core/types/article";
import type { OptionsMenuOption } from "@/shared/components/options-menu/options-menu";
import { create, trash } from "ionicons/icons";
import useAlertPresenter from "@/shared/hooks/use-alert-presenter";
import useArticleStore from "@/shared/store/article/article.store";

interface UseArticleMenuProps {
  article: Article | null;
  onDidDelete?: (articleId: string) => void;
}

interface UseArticleMenuReturn {
  menuOptions: OptionsMenuOption[];
  handleEdit: () => void;
  handleDelete: () => void;
}

export const useArticleMenu = ({
  article,
  onDidDelete,
}: UseArticleMenuProps): UseArticleMenuReturn => {
  const history = useHistory();
  const { showConfirmationAlert, showToast } = useAlertPresenter();
  const { deleteArticle } = useArticleStore((state) => state.actions);

  const handleEdit = () => {
    if (!article?.id) {
      console.warn("Article ID is missing");
      return;
    }

    history.push(appRoutesFactory(article.id)[AppRoutes.EditArticle]);
  };

  const handleDelete = async () => {
    if (!article?.id) {
      console.warn("Article ID is missing");
      return;
    }

    showConfirmationAlert(
      textConstants.deleteArticleConfirmation,
      textConstants.deleteArticleConfirmationButton,
      async () => {
        await deleteArticle(article.id);
        if (onDidDelete) {
          onDidDelete(article.id);
        }

        await showToast("Article deleted successfully", "success");
      }
    );
  };

  const menuOptions: OptionsMenuOption[] = [
    {
      id: "edit",
      label: "Edit",
      icon: create,
      onClick: handleEdit,
    },
    {
      id: "delete",
      label: "Delete",
      icon: trash,
      onClick: handleDelete,
    },
  ];

  return {
    menuOptions,
    handleEdit,
    handleDelete,
  };
};

const textConstants = {
  deleteArticleConfirmation: "Are you sure you want to delete this article?",
  deleteArticleConfirmationButton: "Delete",
};
