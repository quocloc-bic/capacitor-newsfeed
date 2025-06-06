import React from "react";
import useNewsfeedPage from "./newsfeed-page.hook";
import NewsfeedItem from "./components/newsfeed-item/newsfeed-item";
import FloatingButton from "./components/floating-button";
import { useHistory } from "react-router-dom";
import {
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
  IonPage,
} from "@ionic/react";

const NewsfeedPage: React.FC = () => {
  const { articles, loading, loadMore, lastCreatedAt } = useNewsfeedPage();

  const history = useHistory();

  const handleCreateArticle = () => {
    history.push("/create-article");
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
    <IonPage>
      <IonContent>
        <div className="flex justify-center pt-[var(--ion-safe-area-top)]">
          <div className="max-w-screen-md w-full p-4">
            <FloatingButton
              onClick={handleCreateArticle}
              className="md:right-[calc((100vw-768px)/2-5rem)] z-10"
            />

            <IonList mode="ios">
              {articles.map((item) => (
                <NewsfeedItem key={item.id} item={item} className="mb-5" />
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
      </IonContent>
    </IonPage>
  );
};

export default NewsfeedPage;
