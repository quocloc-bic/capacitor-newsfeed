import CommentInput from "@/pages/newsfeed/components/comment-input/comment-input";
import CommentItemWithStore from "@/pages/newsfeed/components/comment-item-wrapper/comment-item-wrapper";
import { IonList } from "@ionic/react";
import Divider from "../divider";
import CommentItemSkeleton from "./comment-item-skeleton";

interface CommentListProps extends React.HTMLAttributes<HTMLDivElement> {
  commentIds: string[];
  articleId: string;
  loadingComments: boolean;
}

const CommentList: React.FC<CommentListProps> = ({
  commentIds,
  articleId,
  loadingComments,
  ...props
}) => {
  return (
    <div {...props}>
      <Divider className="my-4" />

      <CommentInput articleId={articleId} />

      {(commentIds.length > 0 || loadingComments) && (
        <Divider className="my-4" />
      )}

      {loadingComments && <CommentItemSkeleton className="my-4" />}

      {commentIds.length > 0 && !loadingComments && (
        <IonList mode="ios" className="space-y-4">
          {commentIds.map((commentId) => (
            <CommentItemWithStore key={commentId} commentId={commentId} />
          ))}
        </IonList>
      )}
    </div>
  );
};

export default CommentList;
