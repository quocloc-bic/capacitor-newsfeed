import { BlockMenuPlugin } from "@udecode/plate-selection/react";

import { BlockContextMenu } from "@/shared/components/ui/block-context-menu";

import { blockSelectionPlugins } from "./block-selection-plugins";

export const blockMenuPlugins = [
  ...blockSelectionPlugins,
  BlockMenuPlugin.configure({
    render: { aboveEditable: BlockContextMenu },
  }),
] as const;
