import React from "react";
import { type Article } from "../newsfeed-page.hook";
import { cn } from "@/lib/utils";

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
        <img
          src={item.coverUrl}
          alt="cover"
          className="w-full h-full object-cover"
          style={{ aspectRatio: "21/9" }}
          loading="lazy"
        />
      </div>
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-700">
          {item.author.charAt(0)}
        </div>
        <div className="text-sm font-semibold">{item.author}</div>
        <div className="ml-auto text-xs text-gray-400">
          {new Date(item.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
      <div className="text-gray-700 text-base">{item.content}</div>
    </div>
  );
};

export default NewsfeedItem;
