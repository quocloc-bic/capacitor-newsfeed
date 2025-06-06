import React from "react";
import { cn, formatDate } from "@/utils/globals";
import { IonCard, IonImg, IonLabel, IonList, IonSpinner } from "@ionic/react";
import "./newsfeed-item.css";
import CommentInput from "../comment-input/comment-input";
import useArticleStore from "@/store/article/article.store";
import useNewsfeedItem from "./newsfeed-item.hook";
import CommentItemWithStore from "../comment-item-wrapper/comment-item-wrapper";

interface NewsfeedItemProps extends React.HTMLAttributes<HTMLDivElement> {
  articleId: string;
}

const NewsfeedItem: React.FC<NewsfeedItemProps> = ({ articleId, ...props }) => {
  const article = useArticleStore((state) => state.state.articles[articleId]);
  const { loadingComments, commentIds } = useNewsfeedItem(articleId);

  if (!article) return null;

  return (
    <div className={cn(props.className)}>
      <IonCard
        className={cn(
          "rounded-lg bg-white shadow-md flex flex-col gap-2 border border-border"
        )}
      >
        <IonImg
          src={article?.coverImage}
          alt="cover"
          className="w-full h-full object-cover aspect-[21/9]"
        />

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
        </div>
      </IonCard>

      <div className="p-2" />

      <CommentInput articleId={articleId} />

      <div className="p-2" />

      {loadingComments && (
        <div className="flex items-center justify-center">
          <IonSpinner name="crescent" />
        </div>
      )}

      {commentIds.length > 0 && (
        <IonList mode="ios">
          {commentIds.map((commentId) => (
            <CommentItemWithStore
              key={commentId}
              commentId={commentId}
              className="mb-4"
            />
          ))}
        </IonList>
      )}
    </div>
  );
};

export default NewsfeedItem;
