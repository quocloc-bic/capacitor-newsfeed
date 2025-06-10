import { AppRoutes } from "@/core/app-routes";
import Button from "@/shared/components/button";
import { IonIcon } from "@ionic/react";
import { addCircleOutline, newspaperOutline } from "ionicons/icons";
import React from "react";
import { useHistory } from "react-router-dom";

const NewsfeedNoContent: React.FC = () => {
  const history = useHistory();

  const handleCreate = () => {
    history.push(AppRoutes.CreateArticle);
  };

  return (
    <div className="flex flex-col items-center justify-center h-64 w-full bg-white rounded-lg">
      <div className="text-6xl mb-4 text-primary">
        <IonIcon icon={newspaperOutline} />
      </div>
      <div className="text-xl font-bold text-gray-700 mb-2">No news yet!</div>
      <div className="text-gray-500 text-center max-w-xs mb-4">
        There's nothing here right now. Be the first to create an article or
        check back later for updates.
      </div>
      <Button
        color="primary"
        onClick={handleCreate}
        className="flex items-center gap-2"
      >
        <IonIcon icon={addCircleOutline} slot="start" className="mr-2" />
        Create Article
      </Button>
    </div>
  );
};

export default NewsfeedNoContent;
