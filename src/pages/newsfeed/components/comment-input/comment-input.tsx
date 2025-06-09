import Button from "@/shared/components/button";
import TextInput from "@/shared/components/text-input";
import { cn } from "@/shared/utils/globals";
import { IonIcon, IonSpinner } from "@ionic/react";
import { send } from "ionicons/icons";
import useCommentInput from "./comment-input.hook";

interface CommentInputProps extends React.HTMLAttributes<HTMLDivElement> {
  articleId: string;
}

const CommentInput: React.FC<CommentInputProps> = ({ articleId, ...props }) => {
  const { comment, setComment, onSubmit, isSubmitDisabled, loading } =
    useCommentInput({ articleId });

  return (
    <div
      {...props}
      className={cn(
        "flex gap-2 flex-row items-center border border-border rounded-lg px-2",
        props.className
      )}
    >
      <TextInput
        placeholder={textConstants.placeholder}
        className="w-full"
        value={comment}
        onIonInput={(e) => {
          setComment(e.detail.value || "");
        }}
        onEnter={onSubmit}
      />

      <Button
        disabled={isSubmitDisabled || loading}
        size="small"
        onClick={() => {
          onSubmit();
        }}
      >
        {loading ? (
          <IonSpinner name="crescent" slot="icon-only" className="size-4" />
        ) : (
          <IonIcon icon={send} slot="icon-only" size="sm" />
        )}
      </Button>
    </div>
  );
};

export default CommentInput;

const textConstants = {
  placeholder: "Write your comment...",
};
