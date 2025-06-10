import { cn } from "@/shared/utils/globals";
import { IonIcon } from "@ionic/react";
import { personCircle } from "ionicons/icons";

type CommentItemSkeletonProps = React.HTMLAttributes<HTMLDivElement>;

const CommentItemSkeleton: React.FC<CommentItemSkeletonProps> = ({
  className,
}) => {
  return (
    <div className={cn("flex items-start gap-2 animate-pulse", className)}>
      <IonIcon icon={personCircle} size="large" className="text-gray-300" />
      <div className="flex flex-col gap-2 p-4 bg-[#f8f8fb] rounded-lg flex-1">
        <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
        <div className="h-3 w-1/4 bg-gray-100 rounded self-end" />
      </div>
    </div>
  );
};

export default CommentItemSkeleton;
