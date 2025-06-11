import { Plate } from "@udecode/plate/react";
import React, { useCallback, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import type { CreateArticlePayload } from "@/core/types/create-acticle";
import { Editor, EditorContainer } from "@/shared/components/ui/editor";
import { cn } from "@/shared/utils/globals";
import type { Value } from "@udecode/plate";
import ImageSelector from "../image-selector";
import TextInput from "../text-input";
import { FixedToolbar } from "../ui/fixed-toolbar";
import { FixedToolbarButtons } from "../ui/fixed-toolbar-buttons";
import "./text-editor.css";
import { useCreateEditor } from "./use-create-editor";
import { useDevice } from "@/shared/hooks/use-device";

export interface TextEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  article?: CreateArticlePayload;
  onTitleChanged?: (value: string) => void;
  onDescriptionChanged?: (value: string) => void;
  onContentChanged?: (value: Value) => void;
  onCoverImageChanged?: (value: string) => void;
}

const TitleInput = React.memo(
  ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
    <TextInput
      placeholder={textConstants.title}
      className="w-full font-bold text-2xl p-0"
      maxlength={64}
      value={value}
      onIonInput={(e: any) => {
        onChange(e.detail.value ?? "");
      }}
    />
  )
);

const DescriptionInput = React.memo(
  ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
    <TextInput
      placeholder={textConstants.description}
      className="w-full p-0 bg-[#f8f8fb] rounded-lg py-2 px-4"
      maxlength={255}
      value={value}
      onIonInput={(e: any) => {
        onChange(e.detail.value ?? "");
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
