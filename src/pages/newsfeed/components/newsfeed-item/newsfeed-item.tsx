import React from "react";
import { cn, formatDate } from "@/utils/globals";
import type { Article } from "@/types/acticle";
import { IonCard, IonImg, IonLabel } from "@ionic/react";
import "./newsfeed-item.css";

interface NewsfeedItemProps extends React.HTMLAttributes<HTMLDivElement> {
  item: Article;
}

const NewsfeedItem: React.FC<NewsfeedItemProps> = ({ item, ...props }) => {
  return (
    <IonCard
      className={cn(
        "rounded-lg bg-white shadow-md flex flex-col gap-2 border border-border",
        props.className
      )}
    >
      <IonImg
        src={item.coverImage}
        alt="cover"
        className="w-full h-full object-cover aspect-[21/9]"
      />

      <div className="p-4">
        <div className="flex items-center gap-2">
          <div className="ml-auto text-xs text-gray-400">
            {formatDate(item.createdAt)}
          </div>
        </div>

        <div className="h-2" />

        <IonLabel className="text-gray-700 text-lg clamp-2 font-bold">
          {item.title}
        </IonLabel>

        <div className="h-2" />

        <IonLabel className="text-gray-700 text-sm clamp-2">
          {item.description}
        </IonLabel>
      </div>
    </IonCard>
  );
};

export default NewsfeedItem;
