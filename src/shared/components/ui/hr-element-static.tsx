import type { SlateElementProps } from "@udecode/plate";

import { SlateElement } from "@udecode/plate";

import { cn } from "@/shared/utils/globals";

export function HrElementStatic(props: SlateElementProps) {
  return (
    <SlateElement {...props}>
      <div className="cursor-text py-6" contentEditable={false}>
        <hr
          className={cn(
            "h-0.5 rounded-sm border-none bg-muted bg-clip-content"
          )}
        />
      </div>
      {props.children}
    </SlateElement>
  );
}
