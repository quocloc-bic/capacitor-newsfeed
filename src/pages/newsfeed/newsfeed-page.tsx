import React, { useCallback } from "react";
import useNewsfeedPage from "./newsfeed-page.hook";
import NewsfeedItem from "./components/newsfeed-item/newsfeed-item";
import FloatingButton from "./components/floating-button";
import { useHistory } from "react-router-dom";
import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  type InfiniteScrollCustomEvent,
  type RefresherEventDetail,
} from "@ionic/react";
import Content from "@/shared/components/content";
import { AppRoutes } from "@/core/app-routes";
import NewsfeedItemSkeleton from "./components/newsfeed-item-skeleton";
import NewsfeedNoContent from "./components/newsfeed-no-content";
import { delay } from "@/shared/utils/globals";

const NewsfeedPage: React.FC = () => {
  const { articleIds, loading, loadMore, lastCreatedAt, reload } =
    useNewsfeedPage();

  const history = useHistory();

  const handleCreateArticle = useCallback(() => {
    history.push(AppRoutes.CreateArticle);
  }, [history]);

  const handleInfiniteScroll = useCallback(
    (event: InfiniteScrollCustomEvent) => {
      loadMore();

      setTimeout(() => {
        event.target.complete();
      }, 2000);
    },
    [loadMore]
  );

  async function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    await delay(1000);
    await reload();
    event.detail.complete();
  }

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center pt-safe-top p-4">
        <div className="max-w-screen-md w-full space-y-6">
          {[...Array(5)].map((_, i) => (
            <NewsfeedItemSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (articleIds.length === 0) {
    return (
      <div className="flex h-screen flex-col justify-center items-center pt-safe-top p-4">
        <NewsfeedNoContent />
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

            <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
              <IonRefresherContent></IonRefresherContent>
            </IonRefresher>

            <IonList mode="ios" className="space-y-6 !pb-4">
              {articleIds.map((id: string) => (
                <NewsfeedItem articleId={id} key={id} />
              ))}
            </IonList>

            {lastCreatedAt && (
              <IonInfiniteScroll
                className="mt-2"
                onIonInfinite={handleInfiniteScroll}
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

export default React.memo(NewsfeedPage);
