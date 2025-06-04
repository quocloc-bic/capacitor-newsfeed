import { useTextEditorContext } from "@/components/text-editor/text-editor-context";
import React, { useMemo } from "react";
import styles from "./table-of-contents.module.css";
import { IonLabel } from "@ionic/react";
import { cn } from "@/lib/utils";

type TableOfContentsProps = React.HTMLAttributes<HTMLDivElement>;

const TableOfContents: React.FC<TableOfContentsProps> = ({
  className,
  ...props
}) => {
  const { jsonValue } = useTextEditorContext();

  const parsedValue = useMemo(() => {
    return JSON.parse(jsonValue);
  }, [jsonValue]);

  const contents = useMemo(() => {
    return parsedValue.filter(
      (node: any) =>
        node.type === "h1" || node.type === "h2" || node.type === "h3"
    );
  }, [parsedValue]);

  if (contents.length === 0) {
    console.log("🚀 ~ table-of-contents.tsx:28 ~ contents:", contents);
    return null;
  }

  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      {contents.map((item: any) => {
        return (
          <IonLabel key={item.id} className={styles[`item-${item.type}`]}>
            {item.children[0].text}
          </IonLabel>
        );
      })}
    </div>
  );
};

export default TableOfContents;
