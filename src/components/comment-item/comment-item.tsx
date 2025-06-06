import type { Comment } from "@/types/comment";
import { cn, formatDate } from "@/utils/globals";
import { IonLabel } from "@ionic/react";

interface CommentItemProps extends React.HTMLAttributes<HTMLDivElement> {
  comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, ...props }) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 p-2 bg-gray-100 rounded-lg",
        props.className
      )}
    >
      <IonLabel className="text-sm text-gray-700">{comment.comment}</IonLabel>

      <IonLabel className="text-xs text-gray-500 self-end">
        {formatDate(comment.createdAt)}
      </IonLabel>
    </div>
  );
};

export default CommentItem;
