import { AppRoutes, appRoutesFactory } from "@/core/app-routes";
import ArticleMenuButton from "@/shared/components/article-menu-button/article-menu-button";
import CommentList from "@/shared/components/comment-list";
import articleSelectors from "@/shared/store/article/article.selector";
import useArticleStore from "@/shared/store/article/article.store";
import { cn, formatDate } from "@/shared/utils/globals";
import { IonCard, IonImg, IonLabel, IonRouterLink } from "@ionic/react";
import React from "react";
import { useShallow } from "zustand/react/shallow";
import "./newsfeed-item.css";
import useNewsfeedItem from "./newsfeed-item.hook";

interface NewsfeedItemProps extends React.HTMLAttributes<HTMLDivElement> {
  articleId: string;
}

const NewsfeedItem: React.FC<NewsfeedItemProps> = ({ articleId, ...props }) => {
  const article = useArticleStore(
    useShallow(articleSelectors.getArticle(articleId))
  );
  const { loadingComments, commentIds } = useNewsfeedItem(articleId);

  const articleDetailLink =
    appRoutesFactory(articleId)[AppRoutes.ArticleDetail];

  if (!article) return null;

  return (
    <div className={cn(props.className)}>
      <IonCard
        className={cn(
          "rounded-lg bg-white shadow-md flex flex-col border border-border"
        )}
      >
        <IonRouterLink routerLink={articleDetailLink} routerDirection="forward">
          <IonImg
            src={article?.coverImage}
            alt="cover"
            className="w-full h-full object-cover aspect-[21/9]"
          />

          <div className="h-2" />

          <div className="px-4">
            <div className="flex items-center justify-between">
              <IonLabel className="text-gray-700 text-lg clamp-2 font-bold">
                {article?.title}
              </IonLabel>

              <ArticleMenuButton article={article} />
            </div>

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
        </IonRouterLink>

        <div className="px-4 pb-4">
          <CommentList
            commentIds={commentIds}
            articleId={articleId}
            loadingComments={loadingComments}
          />
        </div>
      </IonCard>
    </div>
  );
};

export default React.memo(NewsfeedItem);
