import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  UnderlinePlugin,
} from "@udecode/plate-basic-marks/react";
import {
  FontBackgroundColorPlugin,
  FontColorPlugin,
} from "@udecode/plate-font/react";
import {
  AudioPlugin,
  ImagePlugin,
  VideoPlugin,
} from "@udecode/plate-media/react";
import { useEditorReadOnly } from "@udecode/plate/react";
import {
  ArrowUpToLineIcon,
  BaselineIcon,
  BoldIcon,
  Code2Icon,
  ItalicIcon,
  PaintBucketIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";

import { MoreDropdownMenu } from "@/shared/components/ui/more-dropdown-menu";

import { AlignDropdownMenu } from "./align-dropdown-menu";
import { ColorDropdownMenu } from "./color-dropdown-menu";
import { EmojiDropdownMenu } from "./emoji-dropdown-menu";
import { ExportToolbarButton } from "./export-toolbar-button";
import { FontSizeToolbarButton } from "./font-size-toolbar-button";
import { RedoToolbarButton, UndoToolbarButton } from "./history-toolbar-button";
import { ImportToolbarButton } from "./import-toolbar-button";
import {
  BulletedIndentListToolbarButton,
  NumberedIndentListToolbarButton,
} from "./indent-list-toolbar-button";
import { IndentTodoToolbarButton } from "./indent-todo-toolbar-button";
import { IndentToolbarButton } from "./indent-toolbar-button";
import { InsertDropdownMenu } from "./insert-dropdown-menu";
import { LineHeightDropdownMenu } from "./line-height-dropdown-menu";
import { LinkToolbarButton } from "./link-toolbar-button";
import { MarkToolbarButton } from "./mark-toolbar-button";
import { MediaToolbarButton } from "./media-toolbar-button";
import { OutdentToolbarButton } from "./outdent-toolbar-button";
import { TableDropdownMenu } from "./table-dropdown-menu";
import { ToggleToolbarButton } from "./toggle-toolbar-button";
import { ToolbarGroup } from "./toolbar";
import { TurnIntoDropdownMenu } from "./turn-into-dropdown-menu";

export function FixedToolbarButtons() {
  const readOnly = useEditorReadOnly();

  return (
    <div className="flex flex-wrap w-full gap-1">
      {!readOnly && (
        <>
          <ToolbarGroup className="gap-1">
            <UndoToolbarButton />
            <RedoToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup className="gap-1">
            <ExportToolbarButton>
              <ArrowUpToLineIcon />
            </ExportToolbarButton>

            <ImportToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup className="gap-1">
            <InsertDropdownMenu />
            <TurnIntoDropdownMenu />
            <FontSizeToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup className="gap-1">
            <MarkToolbarButton nodeType={BoldPlugin.key} tooltip="Bold (⌘+B)">
              <BoldIcon />
            </MarkToolbarButton>

            <MarkToolbarButton
              nodeType={ItalicPlugin.key}
              tooltip="Italic (⌘+I)"
            >
              <ItalicIcon />
            </MarkToolbarButton>

            <MarkToolbarButton
              nodeType={UnderlinePlugin.key}
              tooltip="Underline (⌘+U)"
            >
              <UnderlineIcon />
            </MarkToolbarButton>

            <MarkToolbarButton
              nodeType={StrikethroughPlugin.key}
              tooltip="Strikethrough (⌘+⇧+M)"
            >
              <StrikethroughIcon />
            </MarkToolbarButton>

            <MarkToolbarButton nodeType={CodePlugin.key} tooltip="Code (⌘+E)">
              <Code2Icon />
            </MarkToolbarButton>

            <ColorDropdownMenu
              nodeType={FontColorPlugin.key}
              tooltip="Text color"
            >
              <BaselineIcon />
            </ColorDropdownMenu>

            <ColorDropdownMenu
              nodeType={FontBackgroundColorPlugin.key}
              tooltip="Background color"
            >
              <PaintBucketIcon />
            </ColorDropdownMenu>
          </ToolbarGroup>

          <ToolbarGroup className="gap-1">
            <AlignDropdownMenu />

            <NumberedIndentListToolbarButton />
            <BulletedIndentListToolbarButton />
            <IndentTodoToolbarButton />
            <ToggleToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup className="gap-1">
            <LinkToolbarButton />
            <TableDropdownMenu />
            <EmojiDropdownMenu />
          </ToolbarGroup>

          <ToolbarGroup className="gap-1">
            <MediaToolbarButton nodeType={ImagePlugin.key} />
            <MediaToolbarButton nodeType={VideoPlugin.key} />
            <MediaToolbarButton nodeType={AudioPlugin.key} />
          </ToolbarGroup>

          <ToolbarGroup className="gap-1">
            <LineHeightDropdownMenu />
            <OutdentToolbarButton />
            <IndentToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup className="gap-1">
            <MoreDropdownMenu />
          </ToolbarGroup>
        </>
      )}
    </div>
  );
}
