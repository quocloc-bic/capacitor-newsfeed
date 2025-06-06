import useCommentStore from "@/shared/store/comment/comment.store";
import CommentItem from "@/shared/components/comment-item/comment-item";
import commentSelectors from "@/shared/store/comment/comment.selector";
import { useShallow } from "zustand/react/shallow";

interface CommentItemWithStoreProps
  extends React.HTMLAttributes<HTMLDivElement> {
  commentId: string;
}

const CommentItemWithStore: React.FC<CommentItemWithStoreProps> = ({
  commentId,
  ...props
}) => {
  const comment = useCommentStore(
    useShallow(commentSelectors.getComment(commentId))
  );

  if (!comment) return null;

  return <CommentItem comment={comment} {...props} />;
};

export default CommentItemWithStore;
