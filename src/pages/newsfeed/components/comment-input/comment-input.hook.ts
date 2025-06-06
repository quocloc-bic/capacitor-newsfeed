import useAlertPresenter from "@/shared/hooks/use-alert-presenter";
import useCommentStore from "@/shared/store/comment/comment.store";
import { useState } from "react";

interface CommentInputProps {
  articleId: string;
}

const useCommentInput = ({ articleId }: CommentInputProps) => {
  const { showErrorAlert } = useAlertPresenter();
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const { postComment } = useCommentStore((state) => state.actions);

  const isValidPayload = comment.length > 0;

  const clearComment = () => {
    setComment("");
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      await postComment(articleId, comment);
      clearComment();
    } catch (error) {
      showErrorAlert(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    comment,
    setComment,
    onSubmit,
    isSubmitDisabled: !isValidPayload,
    loading,
  };
};

export default useCommentInput;
