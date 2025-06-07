import type { Article } from "@/core/types/article";
import PlateContentViewer from "@/shared/components/plate-content-viewer";
import { IonImg } from "@ionic/react";

interface ArticleDetailContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  article: Article | null;
}

const ArticleDetailContent: React.FC<ArticleDetailContentProps> = ({
  article,
  ...props
}) => {
  const content = article?.content ? JSON.parse(article.content) : [];

  return (
    <div {...props}>
      <div className="aspect-[21/9]">
        <IonImg
          src={article?.coverImage}
          alt={article?.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{article?.title}</h1>
        <p className="text-sm text-gray-500">{article?.description}</p>
      </div>
      <PlateContentViewer value={content} />
    </div>
  );
};

export default ArticleDetailContent;
