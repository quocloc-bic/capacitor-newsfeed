import { AppRoutes } from "@/core/app-routes";
import type { Article } from "@/core/types/article";
import useNewsfeedItem from "@/pages/newsfeed/components/newsfeed-item/newsfeed-item.hook";
import ArticleMenuButton from "@/shared/components/article-menu-button/article-menu-button";
import CommentList from "@/shared/components/comment-list";
import PlateContentViewer from "@/shared/components/plate-content-viewer";
import { cn } from "@/shared/utils/globals";
import { IonCard, IonImg } from "@ionic/react";
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

  const onDidDelete = () => {
    history.replace(AppRoutes.Newsfeed);
  };

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
      </div>

      <div className="flex flex-col gap-4 px-11">
        <div className="flex items-baseline gap-2">
          <h1 className="text-4xl font-semibold text-neutral-60 flex-1">
            {article?.title}
          </h1>

          <ArticleMenuButton article={article} onDidDelete={onDidDelete} />
        </div>
        <p className="text-sm border-y border-neutral-5 bg-neutral-1 p-4 font-medium text-neutral-40">
          {article?.description}
        </p>
        <PlateContentViewer value={content} />

        <CommentList
          commentIds={commentIds}
          articleId={article?.id}
          loadingComments={loadingComments}
        />
      </div>
    </IonCard>
  );
};

export default ArticleDetailContent;
