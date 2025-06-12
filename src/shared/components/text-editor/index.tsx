import { Plate } from "@udecode/plate/react";
import React, { useCallback, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import type { CreateArticlePayload } from "@/core/types/create-article";
import { Editor, EditorContainer } from "@/shared/components/ui/editor";
import { useDevice } from "@/shared/hooks/use-device";
import { cn } from "@/shared/utils/globals";
import type { Value } from "@udecode/plate";
import ImageSelector from "../image-selector";
import TextArea from "../text-area";
import { FixedToolbar } from "../ui/fixed-toolbar";
import { FixedToolbarButtons } from "../ui/fixed-toolbar-buttons";
import "./text-editor.css";
import { useCreateEditor } from "./use-create-editor";

export interface TextEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  article?: CreateArticlePayload;
  onTitleChanged?: (value: string) => void;
  onDescriptionChanged?: (value: string) => void;
  onContentChanged?: (value: Value) => void;
  onCoverImageChanged?: (value: string) => void;
}

const TitleInput = React.memo(
  ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
    <TextArea
      placeholder={textConstants.title}
      className="w-full font-bold text-2xl p-0"
      autoGrow
      debounce={100}
      maxlength={64}
      value={value}
      onIonInput={(e) => {
        onChange(e.detail.value ?? "");
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    />
  )
);

const DescriptionInput = React.memo(
  ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
    <TextArea
      placeholder={textConstants.description}
      className="w-full bg-[#f8f8fb] rounded-lg resize-none p-4 pt-4"
      autoGrow
      maxlength={255}
      debounce={100}
      value={value}
      onIonInput={(e) => {
        onChange(e.detail.value ?? "");
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    />
  )
);

const TextEditor = React.memo(
  ({
    className,
    article,
    onContentChanged,
    onTitleChanged,
    onDescriptionChanged,
    onCoverImageChanged,
    ...props
  }: TextEditorProps) => {
    const { isMobile } = useDevice();
    const editor = useCreateEditor(
      {
        value: article?.content ? JSON.parse(article.content) : undefined,
      },
      [article]
    );

    const [title, setTitle] = useState<string>(article?.title || "");
    const [description, setDescription] = useState<string>(
      article?.description || ""
    );

    useEffect(() => {
      if (article) {
        setTitle(article.title || "");
        setDescription(article.description || "");
      }
    }, [article]);

    const handleTitleChange = useCallback(
      (value: string) => {
        setTitle(value);
        onTitleChanged?.(value);
      },
      [onTitleChanged]
    );

    const handleDescriptionChange = useCallback(
      (value: string) => {
        setDescription(value);
        onDescriptionChanged?.(value);
      },
      [onDescriptionChanged]
    );

    const handleCoverImageChange = useCallback(
      (image: string) => {
        onCoverImageChanged?.(image);
      },
      [onCoverImageChanged]
    );

    const handleContentChange = useCallback(
      (options: { value: Value }) => {
        onContentChanged?.(options.value);
      },
      [onContentChanged]
    );

    return (
      <DndProvider backend={HTML5Backend}>
        <div
          className={cn("editor-container", "bg-white", className)}
          {...props}
        >
          <Plate editor={editor} onChange={handleContentChange}>
            <EditorContainer className="md:pr-4">
              {isMobile ? (
                <div>
                  <ImageSelector
                    className="w-full aspect-[21/9]"
                    imageUrl={article?.coverImage || ""}
                    onImageSelected={handleCoverImageChange}
                  />

                  <div className="h-4" />

                  <TitleInput value={title} onChange={handleTitleChange} />

                  <div className="h-4" />

                  <DescriptionInput
                    value={description}
                    onChange={handleDescriptionChange}
                  />

                  <div className="h-4" />

                  <FixedToolbar>
                    <FixedToolbarButtons />
                  </FixedToolbar>

                  <div className="h-4" />

                  <Editor placeholder={textConstants.content} />
                </div>
              ) : (
                <div>
                  <FixedToolbar>
                    <FixedToolbarButtons />
                  </FixedToolbar>

                  <div className="h-4" />

                  <ImageSelector
                    className="w-full aspect-[21/9]"
                    imageUrl={article?.coverImage || ""}
                    onImageSelected={handleCoverImageChange}
                  />

                  <div className="h-4" />

                  <TitleInput value={title} onChange={handleTitleChange} />

                  <div className="h-4" />

                  <DescriptionInput
                    value={description}
                    onChange={handleDescriptionChange}
                  />

                  <div className="h-4" />

                  <Editor placeholder={textConstants.content} />
                </div>
              )}
            </EditorContainer>
          </Plate>
        </div>
      </DndProvider>
    );
  }
);

export default TextEditor;

const textConstants = {
  title: "Title....*",
  description: "Write max 255 words long description...",
  content: "Type your amazing content here....",
};
