import type { Comment } from "@/core/types/comment";
import { cn, formatDate } from "@/shared/utils/globals";
import { IonIcon, IonLabel } from "@ionic/react";
import { personCircle } from "ionicons/icons";

interface CommentItemProps extends React.HTMLAttributes<HTMLDivElement> {
  comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, ...props }) => {
  return (
    <div className="flex items-start gap-2">
      <IonIcon icon={personCircle} size="large" />

      <div
        className={cn(
          "flex flex-col gap-2 p-4 bg-[#f8f8fb] rounded-lg flex-1",
          props.className
        )}
      >
        <IonLabel className="text-base font-normal text-neutral-60 break-word">
          {comment.comment}
        </IonLabel>

        <div className="h-1" />

        <IonLabel className="text-xs font-medium text-neutral-40 text-right">
          {formatDate(comment.createdAt)}
        </IonLabel>
      </div>
    </div>
  );
};

export default CommentItem;
