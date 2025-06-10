import { AppRoutes, appRoutesFactory } from "@/core/app-routes";
import type { Article } from "@/core/types/article";
import CommentInput from "@/pages/newsfeed/components/comment-input/comment-input";
import CommentItemWithStore from "@/pages/newsfeed/components/comment-item-wrapper/comment-item-wrapper";
import useNewsfeedItem from "@/pages/newsfeed/components/newsfeed-item/newsfeed-item.hook";
import Button from "@/shared/components/button";
import Divider from "@/shared/components/divider";
import PlateContentViewer from "@/shared/components/plate-content-viewer";
import { cn } from "@/shared/utils/globals";
import { IonCard, IonIcon, IonImg, IonList, IonSpinner } from "@ionic/react";
import { createOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";

interface ArticleDetailContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  article: Article | null;
}

const ArticleDetailContent: React.FC<ArticleDetailContentProps> = ({
  article,
  className,
}) => {
  const { loadingComments, commentIds } = useNewsfeedItem(article?.id || "");
  const history = useHistory();
  const content = article?.content ? JSON.parse(article.content) : [];

  if (!article) {
    return null;
  }

  return (
    <IonCard
      className={cn(
        "flex flex-col h-full bg-white pb-10 rounded-lg",
        className
      )}
    >
      <div>
        <IonImg
          src={article?.coverImage}
          alt={article?.title}
          className="aspect-[21/9] w-full object-cover"
        />

        <Button
          fill="clear"
          color="dark"
          className="absolute top-0 right-4 text-white h-4"
          noPadding
          onClick={() => {
            if (!article?.id) {
              return;
            }

            history.push(appRoutesFactory(article?.id)[AppRoutes.EditArticle]);
          }}
        >
          <IonIcon icon={createOutline} size="large" />
        </Button>
      </div>
      <div className="flex flex-col gap-4 px-11">
        <h1 className="text-4xl font-semibold text-neutral-60">
          {article?.title}
        </h1>
        <p className="text-sm border-y border-neutral-5 bg-neutral-1 p-4 font-medium text-neutral-40">
          {article?.description}
        </p>
        <PlateContentViewer value={content} />

        <Divider className="my-4" />

        <CommentInput articleId={article?.id} />

        {loadingComments && (
          <div className="flex items-center justify-center my-4">
            <IonSpinner name="crescent" />
          </div>
        )}

        {commentIds.length > 0 && (
          <>
            <Divider className="my-4" />

            <IonList mode="ios" className="space-y-4">
              {commentIds.map((commentId) => (
                <CommentItemWithStore key={commentId} commentId={commentId} />
              ))}
            </IonList>
          </>
        )}
      </div>
    </IonCard>
  );
};

export default ArticleDetailContent;
