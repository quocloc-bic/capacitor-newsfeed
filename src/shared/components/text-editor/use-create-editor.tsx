import type { Value } from "@udecode/plate";

import { withProps } from "@udecode/cn";
import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  UnderlinePlugin,
} from "@udecode/plate-basic-marks/react";
import { BlockquotePlugin } from "@udecode/plate-block-quote/react";
import { CalloutPlugin } from "@udecode/plate-callout/react";
import {
  CodeBlockPlugin,
  CodeLinePlugin,
  CodeSyntaxPlugin,
} from "@udecode/plate-code-block/react";
import { DatePlugin } from "@udecode/plate-date/react";
import { EmojiInputPlugin } from "@udecode/plate-emoji/react";
import { ExcalidrawPlugin } from "@udecode/plate-excalidraw/react";
import { HEADING_KEYS } from "@udecode/plate-heading";
import { TocPlugin } from "@udecode/plate-heading/react";
import { HorizontalRulePlugin } from "@udecode/plate-horizontal-rule/react";
import { KbdPlugin } from "@udecode/plate-kbd/react";
import { ColumnItemPlugin, ColumnPlugin } from "@udecode/plate-layout/react";
import { LinkPlugin } from "@udecode/plate-link/react";
import {
  EquationPlugin,
  InlineEquationPlugin,
} from "@udecode/plate-math/react";
import {
  AudioPlugin,
  FilePlugin,
  ImagePlugin,
  MediaEmbedPlugin,
  PlaceholderPlugin,
  VideoPlugin,
} from "@udecode/plate-media/react";
import {
  MentionInputPlugin,
  MentionPlugin,
} from "@udecode/plate-mention/react";
import { SlashInputPlugin } from "@udecode/plate-slash-command/react";
import {
  TableCellHeaderPlugin,
  TableCellPlugin,
  TablePlugin,
  TableRowPlugin,
} from "@udecode/plate-table/react";
import { TogglePlugin } from "@udecode/plate-toggle/react";
import {
  type CreatePlateEditorOptions,
  ParagraphPlugin,
  PlateLeaf,
  usePlateEditor,
} from "@udecode/plate/react";

import { editorPlugins } from "@/shared/components/text-editor/plugins/editor-plugins";
import { FloatingToolbarPlugin } from "@/shared/components/text-editor/plugins/floating-toolbar-plugin";
import { BlockquoteElement } from "@/shared/components/ui/blockquote-element";
import { CalloutElement } from "@/shared/components/ui/callout-element";
import { CodeBlockElement } from "@/shared/components/ui/code-block-element";
import { CodeLeaf } from "@/shared/components/ui/code-leaf";
import { CodeLineElement } from "@/shared/components/ui/code-line-element";
import { CodeSyntaxLeaf } from "@/shared/components/ui/code-syntax-leaf";
import { ColumnElement } from "@/shared/components/ui/column-element";
import { ColumnGroupElement } from "@/shared/components/ui/column-group-element";
import { DateElement } from "@/shared/components/ui/date-element";
import { EmojiInputElement } from "@/shared/components/ui/emoji-input-element";
import { EquationElement } from "@/shared/components/ui/equation-element";
import { ExcalidrawElement } from "@/shared/components/ui/excalidraw-element";
import { HeadingElement } from "@/shared/components/ui/heading-element";
import { HrElement } from "@/shared/components/ui/hr-element";
import { ImageElement } from "@/shared/components/ui/image-element";
import { InlineEquationElement } from "@/shared/components/ui/inline-equation-element";
import { KbdLeaf } from "@/shared/components/ui/kbd-leaf";
import { LinkElement } from "@/shared/components/ui/link-element";
import { MediaAudioElement } from "@/shared/components/ui/media-audio-element";
import { MediaEmbedElement } from "@/shared/components/ui/media-embed-element";
import { MediaFileElement } from "@/shared/components/ui/media-file-element";
import { MediaPlaceholderElement } from "@/shared/components/ui/media-placeholder-element";
import { MediaVideoElement } from "@/shared/components/ui/media-video-element";
import { MentionElement } from "@/shared/components/ui/mention-element";
import { MentionInputElement } from "@/shared/components/ui/mention-input-element";
import { ParagraphElement } from "@/shared/components/ui/paragraph-element";
import { withPlaceholders } from "@/shared/components/ui/placeholder";
import { SlashInputElement } from "@/shared/components/ui/slash-input-element";
import {
  TableCellElement,
  TableCellHeaderElement,
} from "@/shared/components/ui/table-cell-element";
import { TableElement } from "@/shared/components/ui/table-element";
import { TableRowElement } from "@/shared/components/ui/table-row-element";
import { TocElement } from "@/shared/components/ui/toc-element";
import { ToggleElement } from "@/shared/components/ui/toggle-element";

export const viewComponents = {
  [AudioPlugin.key]: MediaAudioElement,
  [BlockquotePlugin.key]: BlockquoteElement,
  [BoldPlugin.key]: withProps(PlateLeaf, { as: "strong" }),
  [CalloutPlugin.key]: CalloutElement,
  [CodeBlockPlugin.key]: CodeBlockElement,
  [CodeLinePlugin.key]: CodeLineElement,
  [CodePlugin.key]: CodeLeaf,
  [CodeSyntaxPlugin.key]: CodeSyntaxLeaf,
  [ColumnItemPlugin.key]: ColumnElement,
  [ColumnPlugin.key]: ColumnGroupElement,
  [DatePlugin.key]: DateElement,
  [EquationPlugin.key]: EquationElement,
  [ExcalidrawPlugin.key]: ExcalidrawElement,
  [FilePlugin.key]: MediaFileElement,
  [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: "h1" }),
  [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: "h2" }),
  [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: "h3" }),
  [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: "h4" }),
  [HEADING_KEYS.h5]: withProps(HeadingElement, { variant: "h5" }),
  [HEADING_KEYS.h6]: withProps(HeadingElement, { variant: "h6" }),
  [HorizontalRulePlugin.key]: HrElement,
  [ImagePlugin.key]: ImageElement,
  [InlineEquationPlugin.key]: InlineEquationElement,
  [ItalicPlugin.key]: withProps(PlateLeaf, { as: "em" }),
  [KbdPlugin.key]: KbdLeaf,
  [LinkPlugin.key]: LinkElement,
  [MediaEmbedPlugin.key]: MediaEmbedElement,
  [MentionPlugin.key]: MentionElement,
  [ParagraphPlugin.key]: ParagraphElement,
  [PlaceholderPlugin.key]: MediaPlaceholderElement,
  [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: "s" }),
  [SubscriptPlugin.key]: withProps(PlateLeaf, { as: "sub" }),
  [SuperscriptPlugin.key]: withProps(PlateLeaf, { as: "sup" }),
  [TableCellHeaderPlugin.key]: TableCellHeaderElement,
  [TableCellPlugin.key]: TableCellElement,
  [TablePlugin.key]: TableElement,
  [TableRowPlugin.key]: TableRowElement,
  [TocPlugin.key]: TocElement,
  [TogglePlugin.key]: ToggleElement,
  [UnderlinePlugin.key]: withProps(PlateLeaf, { as: "u" }),
  [VideoPlugin.key]: MediaVideoElement,
};

export const editorComponents = {
  ...viewComponents,
  [EmojiInputPlugin.key]: EmojiInputElement,
  [MentionInputPlugin.key]: MentionInputElement,
  [SlashInputPlugin.key]: SlashInputElement,
};

export const useCreateEditor = (
  {
    components,
    override,
    placeholders,
    readOnly,
    ...options
  }: {
    components?: Record<string, any>;
    placeholders?: boolean;
    plugins?: any[];
    readOnly?: boolean;
  } & Omit<CreatePlateEditorOptions, "plugins"> = {},
  deps: any[] = []
) => {
  return usePlateEditor<Value, (typeof editorPlugins)[number]>(
    {
      override: {
        components: {
          ...(readOnly
            ? viewComponents
            : placeholders
              ? withPlaceholders(editorComponents)
              : editorComponents),
          ...components,
        },
        ...override,
      },
      plugins: [...editorPlugins, FloatingToolbarPlugin],
      value: [],
      ...options,
    },
    deps
  );
};
