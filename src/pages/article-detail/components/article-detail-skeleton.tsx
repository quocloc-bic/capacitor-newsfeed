import { IonSpinner } from "@ionic/react";

const ArticleDetailPageSkeleton: React.FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <IonSpinner />
    </div>
  );
};

export default ArticleDetailPageSkeleton;
