import React, { useState } from "react";
import { Plate } from "@udecode/plate/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Editor, EditorContainer } from "@/shared/components/ui/editor";
import { cn } from "@/shared/utils/globals";
import { useCreateEditor } from "./use-create-editor";
import type { Value } from "@udecode/plate";
import ImageSelector from "../image-selector";
import { FixedToolbar } from "../ui/fixed-toolbar";
import { FixedToolbarButtons } from "../ui/fixed-toolbar-buttons";
import "./text-editor.css";
import TextInput from "../text-input";
import type { Article } from "@/core/types/article";

export interface TextEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  article?: Article;
  onTitleChanged?: (value: string) => void;
  onDescriptionChanged?: (value: string) => void;
  onContentChanged?: (value: Value) => void;
  onCoverImageChanged?: (value: string) => void;
}

const TextEditor = ({
  className,
  article,
  onContentChanged,
  onTitleChanged,
  onDescriptionChanged,
  onCoverImageChanged,
  ...props
}: TextEditorProps) => {
  const editor = useCreateEditor({
    value: article?.content ? JSON.parse(article.content) : undefined,
  });

  const [title, setTitle] = useState<string>(article?.title || "");
  const [description, setDescription] = useState<string>(
    article?.description || ""
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={cn("editor-container", "bg-white", className)} {...props}>
        <Plate
          editor={editor}
          onChange={(options) => {
            onContentChanged?.(options.value);
          }}
        >
          <EditorContainer className="pr-4">
            <div className="">
              <FixedToolbar>
                <FixedToolbarButtons />
              </FixedToolbar>

              <div className="h-4" />

              <ImageSelector
                className="w-full aspect-[21/9]"
                imageUrl={article?.coverImage || ""}
                onImageSelected={(image) => {
                  onCoverImageChanged?.(image);
                }}
              />

              <div className="h-4" />

              <TextInput
                placeholder="Title....*"
                className="w-full font-bold text-2xl p-0"
                maxlength={64}
                value={title}
                onIonInput={(e: any) => {
                  setTitle(e.detail.value ?? "");
                  onTitleChanged?.(e.detail.value ?? "");
                }}
              />

              <div className="h-4" />

              <TextInput
                placeholder="Write max 255 words long description..."
                className="w-full p-0 bg-[#f8f8fb] rounded-lg py-2 px-4"
                maxlength={255}
                value={description}
                onIonInput={(e: any) => {
                  setDescription(e.detail.value ?? "");
                  onDescriptionChanged?.(e.detail.value ?? "");
                }}
              />

              <div className="h-4" />

              <Editor placeholder="Type your amazing content here...." />
            </div>
          </EditorContainer>
        </Plate>
      </div>
    </DndProvider>
  );
};

export default React.memo(TextEditor);
