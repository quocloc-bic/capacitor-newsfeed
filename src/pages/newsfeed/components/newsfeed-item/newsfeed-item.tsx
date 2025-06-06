import React from "react";
import { cn, formatDate } from "@/utils/globals";
import type { Article } from "@/types/acticle";
import { IonImg, IonLabel } from "@ionic/react";
import "./newsfeed-item.css";

interface NewsfeedItemProps extends React.HTMLAttributes<HTMLDivElement> {
  item: Article;
}

const NewsfeedItem: React.FC<NewsfeedItemProps> = ({ item, ...props }) => {
  return (
    <div
      className={cn(
        "rounded-lg bg-white p-4 shadow-md flex flex-col gap-2",
        props.className
      )}
    >
      <div
        className="w-full rounded-md overflow-hidden mb-2"
        style={{ aspectRatio: "21/9" }}
      >
        <IonImg
          src={item.coverImage}
          alt="cover"
          className="w-full h-full object-cover aspect-[21/9]"
        />
      </div>
      <div className="flex items-center gap-2">
        <div className="ml-auto text-xs text-gray-400">
          {formatDate(item.createdAt)}
        </div>
      </div>
      <IonLabel className="text-gray-700 text-base clamp-2 font-bold">
        {item.title}
      </IonLabel>
      <IonLabel className="text-gray-700 text-base clamp-2">
        {item.description}
      </IonLabel>
    </div>
  );
};

export default NewsfeedItem;
