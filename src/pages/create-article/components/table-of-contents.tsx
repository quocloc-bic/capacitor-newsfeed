import React, { useMemo, useEffect, useState } from "react";
import styles from "./table-of-contents.module.css";
import { IonLabel } from "@ionic/react";
import { cn } from "@/utils/globals";
import { textEditorValueEmitter } from "@/components/text-editor";
import type { Value } from "@udecode/plate";

type TableOfContentsProps = React.HTMLAttributes<HTMLDivElement>;

const TableOfContents: React.FC<TableOfContentsProps> = ({
  className,
  ...props
}) => {
  const [editorValue, setEditorValue] = useState<Value>([]);

  useEffect(() => {
    const unsubscribe = textEditorValueEmitter.subscribe((value) => {
      setEditorValue(value);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const contents = useMemo(() => {
    return (editorValue || []).filter(
      (node: any) =>
        node.type === "h1" || node.type === "h2" || node.type === "h3"
    );
  }, [editorValue]);

  if (contents.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-col gap-2 px-4 py-2", className)} {...props}>
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
