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
  const { articles, loading, loadingMore, loadMore, lastCreatedAt } =
    useNewsfeedPage();
  const history = useHistory();

  const handleCreateArticle = () => {
    history.push("/create-article");
  };

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center pt-safe-top">
        <h1 className="mb-4 text-4xl">Newsfeed</h1>
        <div className="w-full max-w-md space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-lg bg-gray-200 p-4 h-24"
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
          <div className="w-full px-4 md:w-[600px]">
            <FloatingButton
              onClick={handleCreateArticle}
              className="md:right-[calc((100vw-600px)/2-5rem)] z-10"
            />

            <IonList>
              {articles.map((item) => (
                <NewsfeedItem key={item.id} item={item} className="mb-4" />
              ))}
            </IonList>

            {!loadingMore && !loading && lastCreatedAt && (
              <IonInfiniteScroll
                onIonInfinite={() => {
                  loadMore();
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
