import React from "react";
import useNewsfeedPage from "./newsfeed-page.hook";
import NewsfeedItem from "./components/newsfeed-item/newsfeed-item";
import FloatingButton from "./components/floating-button";
import { useHistory } from "react-router-dom";
import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
  IonPage,
} from "@ionic/react";
import Content from "@/shared/components/content";
import { AppRoutes } from "@/app/app";

const NewsfeedPage: React.FC = () => {
  const { articleIds, loading, loadMore, lastCreatedAt } = useNewsfeedPage();

  const history = useHistory();

  const handleCreateArticle = () => {
    history.push(AppRoutes.CreateArticle);
  };

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center pt-safe-top">
        <div className="max-w-screen-md w-full space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-lg bg-gray-200 p-4 h-[200px]"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <IonPage className="bg-background">
      <Content>
        <div className="flex justify-center pt-[var(--ion-safe-area-top)]">
          <div className="max-w-screen-md w-full p-4">
            <FloatingButton
              onClick={handleCreateArticle}
              className="[@media(min-width:900px)]:right-[calc((100vw-768px)/2-5rem)] z-10"
            />

            <IonList mode="ios" className="space-y-6">
              {articleIds.map((id: string) => (
                <NewsfeedItem articleId={id} key={id} />
              ))}
            </IonList>

            {lastCreatedAt && (
              <IonInfiniteScroll
                onIonInfinite={(event) => {
                  loadMore();

                  setTimeout(() => {
                    event.target.complete();
                  }, 2000);
                }}
              >
                <IonInfiniteScrollContent />
              </IonInfiniteScroll>
            )}
          </div>
        </div>
      </Content>
    </IonPage>
  );
};

export default NewsfeedPage;
