import type { SlateElementProps } from "@udecode/plate";

import { SlateElement } from "@udecode/plate";

import { cn } from "@/shared/utils/globals";

export function ParagraphElementStatic(props: SlateElementProps) {
  return (
    <SlateElement {...props} className={cn("m-0 px-0 py-1")}>
      {props.children}
    </SlateElement>
  );
}
