import useCommentStore from "@/store/comment/comment.store";
import CommentItem from "@/components/comment-item/comment-item";

interface CommentItemWithStoreProps
  extends React.HTMLAttributes<HTMLDivElement> {
  commentId: string;
}

const CommentItemWithStore: React.FC<CommentItemWithStoreProps> = ({
  commentId,
  ...props
}) => {
  const comment = useCommentStore((state) => state.state.comments?.[commentId]);

  if (!comment) return null;

  return <CommentItem comment={comment} {...props} />;
};

export default CommentItemWithStore;
