import React, { useMemo, useEffect, useState } from "react";
import styles from "./table-of-contents.module.css";
import { IonLabel } from "@ionic/react";
import { cn } from "@/shared/utils/globals";
import type { Value } from "@udecode/plate";
import { textEditorValueEmitter } from "../text-editor-wrapper/text-editor-wrapper";

interface TableOfContentsProps extends React.HTMLAttributes<HTMLDivElement> {
  value: Value;
  onDidSelect?: (id: string) => void;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  className,
  value,
  onDidSelect,
  ...props
}) => {
  const contents = useMemo(() => {
    return (value || []).filter(
      (node: any) =>
        node.type === "h1" || node.type === "h2" || node.type === "h3"
    );
  }, [value]);

  if (contents.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-col gap-2 px-4 py-2", className)} {...props}>
      {contents.map((item: any) => {
        return (
          <IonLabel
            key={item.id}
            className={styles[`item-${item.type}`]}
            onClick={() => onDidSelect?.(item.id)}
          >
            {item.children[0].text}
          </IonLabel>
        );
      })}
    </div>
  );
};

export default TableOfContents;

export const TableOfContentsWithEmitter: React.FC<
  Omit<TableOfContentsProps, "value">
> = ({ ...props }) => {
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

  return <TableOfContents value={editorValue} {...props} />;
};
