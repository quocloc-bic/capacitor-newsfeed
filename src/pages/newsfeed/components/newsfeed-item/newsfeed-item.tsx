import React from "react";
import { cn, formatDate } from "@/shared/utils/globals";
import {
  IonCard,
  IonImg,
  IonLabel,
  IonList,
  IonRouterLink,
  IonSpinner,
} from "@ionic/react";
import "./newsfeed-item.css";
import CommentInput from "../comment-input/comment-input";
import useArticleStore from "@/shared/store/article/article.store";
import useNewsfeedItem from "./newsfeed-item.hook";
import CommentItemWithStore from "../comment-item-wrapper/comment-item-wrapper";
import Divider from "@/shared/components/divider";
import { useShallow } from "zustand/react/shallow";
import articleSelectors from "@/shared/store/article/article.selector";

interface NewsfeedItemProps extends React.HTMLAttributes<HTMLDivElement> {
  articleId: string;
}

const NewsfeedItem: React.FC<NewsfeedItemProps> = ({ articleId, ...props }) => {
  const article = useArticleStore(
    useShallow(articleSelectors.getArticle(articleId))
  );
  const { loadingComments, commentIds } = useNewsfeedItem(articleId);

  if (!article) return null;

  return (
    <div className={cn(props.className)}>
      <IonCard
        className={cn(
          "rounded-lg bg-white shadow-md flex flex-col gap-2 border border-border"
        )}
      >
        <IonRouterLink
          routerLink={`/article?id=${articleId}`}
          routerDirection="forward"
        >
          <IonImg
            src={article?.coverImage}
            alt="cover"
            className="w-full h-full object-cover aspect-[21/9]"
          />
        </IonRouterLink>

        <div className="p-4">
          <IonLabel className="text-gray-700 text-lg clamp-2 font-bold">
            {article?.title}
          </IonLabel>

          <div className="h-2" />

          <IonLabel className="text-gray-700 text-sm clamp-2">
            {article?.description}
          </IonLabel>

          <div className="h-2" />

          <div className="flex items-center gap-2">
            <IonLabel className="ml-auto text-xs text-gray-400">
              {formatDate(article?.createdAt)}
            </IonLabel>
          </div>

          <Divider className="my-4" />

          <CommentInput articleId={articleId} />

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
    </div>
  );
};

export default NewsfeedItem;
