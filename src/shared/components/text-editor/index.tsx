import type { CreateArticlePayload } from "@/core/types/create-article";
import { Editor, EditorContainer } from "@/shared/components/ui/editor";
import { useDevice } from "@/shared/hooks/use-device";
import { cn } from "@/shared/utils/globals";
import type { Value } from "@udecode/plate";
import { Plate } from "@udecode/plate/react";
import React, { useCallback, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ImageSelector from "../image-selector";
import TextArea from "../text-area";
import { FixedToolbar } from "../ui/fixed-toolbar";
import { FixedToolbarButtons } from "../ui/fixed-toolbar-buttons";
import "./text-editor.css";
import { useCreateEditor } from "./use-create-editor";

export interface TextEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  payload?: CreateArticlePayload;
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
      onIonInput={(e) => onChange(e.detail.value ?? "")}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.preventDefault();
      }}
    />
  )
);

const DescriptionInput = React.memo(
  ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
    <TextArea
      placeholder={textConstants.description}
      className="w-full bg-[#f8f8fb] rounded-lg p-4 pt-4"
      autoGrow
      maxlength={255}
      debounce={100}
      value={value}
      onIonInput={(e) => onChange(e.detail.value ?? "")}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.preventDefault();
      }}
    />
  )
);

const TextEditor = React.memo(
  ({
    className,
    payload,
    onContentChanged,
    onTitleChanged,
    onDescriptionChanged,
    onCoverImageChanged,
    ...props
  }: TextEditorProps) => {
    const { isMobile } = useDevice();
    const editor = useCreateEditor(
      {
        value: payload?.content ? JSON.parse(payload.content) : undefined,
      },
      [payload]
    );
    const [title, setTitle] = useState<string>(payload?.title || "");
    const [description, setDescription] = useState<string>(
      payload?.description || ""
    );
    const [coverImage, setCoverImage] = useState<string>(
      payload?.coverImage || ""
    );

    useEffect(() => {
      if (payload) {
        setTitle(payload.title || "");
        setDescription(payload.description || "");
        setCoverImage(payload.coverImage || "");
      }
    }, [payload]);

    const handleTitleChange = (value: string) => {
      setTitle(value);
      onTitleChanged?.(value);
    };
    const handleDescriptionChange = (value: string) => {
      setDescription(value);
      onDescriptionChanged?.(value);
    };
    const handleCoverImageChange = (image: string) => {
      setCoverImage(image);
      onCoverImageChanged?.(image);
    };
    const handleContentChange = (options: { value: Value }) => {
      onContentChanged?.(options.value);
    };

    const renderImageSelector = useCallback(() => {
      return (
        <ImageSelector
          className="w-full aspect-[21/9]"
          imageUrl={coverImage}
          onImageSelected={handleCoverImageChange}
        />
      );
    }, [coverImage, handleCoverImageChange]);

    const renderTitleInput = useCallback(() => {
      return <TitleInput value={title} onChange={handleTitleChange} />;
    }, [title, handleTitleChange]);

    const renderDescriptionInput = useCallback(() => {
      return (
        <DescriptionInput
          value={description}
          onChange={handleDescriptionChange}
        />
      );
    }, [description, handleDescriptionChange]);

    const renderFixedToolbar = useCallback(() => {
      return (
        <FixedToolbar>
          <FixedToolbarButtons />
        </FixedToolbar>
      );
    }, []);

    const renderEditor = useCallback(() => {
      return <Editor placeholder={textConstants.content} />;
    }, []);

    return (
      <DndProvider backend={HTML5Backend}>
        <div
          className={cn("editor-container", "bg-white", className)}
          {...props}
        >
          <Plate editor={editor} onChange={handleContentChange}>
            <EditorContainer className="md:pr-4">
              {isMobile ? (
                <>
                  {renderImageSelector()}
                  <div className="h-4" />
                  {renderTitleInput()}
                  <div className="h-4" />
                  {renderDescriptionInput()}
                  <div className="h-4" />
                  {renderFixedToolbar()}
                  <div className="h-4" />
                  {renderEditor()}
                </>
              ) : (
                <>
                  {renderFixedToolbar()}
                  <div className="h-4" />
                  {renderImageSelector()}
                  <div className="h-4" />
                  {renderTitleInput()}
                  <div className="h-4" />
                  {renderDescriptionInput()}
                  <div className="h-4" />
                  {renderEditor()}
                </>
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
