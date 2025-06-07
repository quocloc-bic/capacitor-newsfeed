import Header from "@/shared/components/header";
import { IonTitle, IonToolbar } from "@ionic/react";
import { IonPage } from "@ionic/react";
import { useQueryParams } from "@/shared/hooks/use-query-params";
import useArticleDetailPage from "./article-detail-page.hook";
import Content from "@/shared/components/content";
import ArticleDetailContent from "./components/article-detail-content";
import PageNotFound from "@/shared/components/page-not-found";
import { useDevice } from "@/shared/hooks/use-device";
import ArticleDetailPageSkeleton from "./components/article-detail-skeleton";

type ArticleDetailPageQueryParams = {
  id: string;
};

const ArticleDetailPage: React.FC = () => {
  const { id } = useQueryParams<ArticleDetailPageQueryParams>();
  const { article, loading } = useArticleDetailPage(id);
  const { isMobile } = useDevice();

  return (
    <IonPage>
      <Header hidden={!isMobile}>
        <IonToolbar>
          <IonTitle>Article Detail</IonTitle>
        </IonToolbar>
      </Header>

      <Content className="h-full">
        <div className="flex h-full bg-gray-50 justify-center">
          <div className="max-w-screen-md w-full">
            {loading && !article ? (
              <ArticleDetailPageSkeleton />
            ) : article ? (
              <ArticleDetailContent article={article} />
            ) : (
              <PageNotFound />
            )}
          </div>
        </div>
      </Content>
    </IonPage>
  );
};

export default ArticleDetailPage;
