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

import { editorPlugins } from "@/components/text-editor/plugins/editor-plugins";
import { FixedToolbarPlugin } from "@/components/text-editor/plugins/fixed-toolbar-plugin";
import { FloatingToolbarPlugin } from "@/components/text-editor/plugins/floating-toolbar-plugin";
import { BlockquoteElement } from "@/components/ui/blockquote-element";
import { CalloutElement } from "@/components/ui/callout-element";
import { CodeBlockElement } from "@/components/ui/code-block-element";
import { CodeLeaf } from "@/components/ui/code-leaf";
import { CodeLineElement } from "@/components/ui/code-line-element";
import { CodeSyntaxLeaf } from "@/components/ui/code-syntax-leaf";
import { ColumnElement } from "@/components/ui/column-element";
import { ColumnGroupElement } from "@/components/ui/column-group-element";
import { DateElement } from "@/components/ui/date-element";
import { EmojiInputElement } from "@/components/ui/emoji-input-element";
import { EquationElement } from "@/components/ui/equation-element";
import { ExcalidrawElement } from "@/components/ui/excalidraw-element";
import { HeadingElement } from "@/components/ui/heading-element";
import { HrElement } from "@/components/ui/hr-element";
import { ImageElement } from "@/components/ui/image-element";
import { InlineEquationElement } from "@/components/ui/inline-equation-element";
import { KbdLeaf } from "@/components/ui/kbd-leaf";
import { LinkElement } from "@/components/ui/link-element";
import { MediaAudioElement } from "@/components/ui/media-audio-element";
import { MediaEmbedElement } from "@/components/ui/media-embed-element";
import { MediaFileElement } from "@/components/ui/media-file-element";
import { MediaPlaceholderElement } from "@/components/ui/media-placeholder-element";
import { MediaVideoElement } from "@/components/ui/media-video-element";
import { MentionElement } from "@/components/ui/mention-element";
import { MentionInputElement } from "@/components/ui/mention-input-element";
import { ParagraphElement } from "@/components/ui/paragraph-element";
import { withPlaceholders } from "@/components/ui/placeholder";
import { SlashInputElement } from "@/components/ui/slash-input-element";
import {
  TableCellElement,
  TableCellHeaderElement,
} from "@/components/ui/table-cell-element";
import { TableElement } from "@/components/ui/table-element";
import { TableRowElement } from "@/components/ui/table-row-element";
import { TocElement } from "@/components/ui/toc-element";
import { ToggleElement } from "@/components/ui/toggle-element";

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
      plugins: [...editorPlugins, FixedToolbarPlugin, FloatingToolbarPlugin],
      value: [],
      ...options,
    },
    deps
  );
};
