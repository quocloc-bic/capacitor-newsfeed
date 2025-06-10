import React from "react";
import { IonCard } from "@ionic/react";
import Divider from "@/shared/components/divider";

const NewsfeedItemSkeleton: React.FC = () => {
  return (
    <div>
      <IonCard className="rounded-lg bg-white shadow-md flex flex-col gap-2 border border-border animate-pulse">
        <div className="w-full aspect-[21/9] bg-gray-200" />

        <div className="p-4">
          <div className="h-6 w-3/4 bg-gray-200 rounded mb-2" />

          <div className="h-4 w-full bg-gray-200 rounded mb-2" />
          <div className="h-4 w-5/6 bg-gray-200 rounded mb-2" />

          <div className="flex items-center gap-2 mb-4">
            <div className="ml-auto h-3 w-16 bg-gray-200 rounded" />
          </div>

          <Divider className="my-4" />

          <div className="h-10 w-full bg-gray-100 rounded" />
        </div>
      </IonCard>
    </div>
  );
};

export default NewsfeedItemSkeleton;
