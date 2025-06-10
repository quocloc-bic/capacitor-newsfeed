import Button from "@/shared/components/button";
import Content from "@/shared/components/content";
import Header from "@/shared/components/header";
import PageNotFound from "@/shared/components/page-not-found";
import { useDevice } from "@/shared/hooks/use-device";
import { useQueryParams } from "@/shared/hooks/use-query-params";
import { cn } from "@/shared/utils/globals";
import {
  IonButtons,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import useArticleDetailPage from "./article-detail-page.hook";
import ArticleDetailContent from "./components/article-detail-content";
import ArticleDetailPageSkeleton from "./components/article-detail-skeleton";

type ArticleDetailPageQueryParams = {
  id: string;
};

const ArticleDetailPage: React.FC = () => {
  const { id } = useQueryParams<ArticleDetailPageQueryParams>();
  const { article, loading } = useArticleDetailPage(id);

  const { isMobile } = useDevice();
  const history = useHistory();

  return (
    <IonPage>
      <Header hidden={!isMobile}>
        <IonToolbar>
          <IonButtons slot="start">
            <Button fill="clear" color="dark" onClick={() => history.goBack()}>
              <IonIcon icon={chevronBack} />
            </Button>
          </IonButtons>
          <IonTitle>{textConstants.title}</IonTitle>
        </IonToolbar>
      </Header>

      <Content>
        {!loading && !article && <PageNotFound />}

        <div
          className={cn(
            "flex flex-1 bg-gray-5 justify-center p-10 min-h-screen",
            loading && !article && "bg-white"
          )}
        >
          <div className="max-w-screen-md w-full">
            {loading && !article ? (
              <ArticleDetailPageSkeleton />
            ) : article ? (
              <ArticleDetailContent article={article} />
            ) : null}
          </div>
        </div>
      </Content>
    </IonPage>
  );
};

export default ArticleDetailPage;

const textConstants = {
  title: "Article Detail",
};
