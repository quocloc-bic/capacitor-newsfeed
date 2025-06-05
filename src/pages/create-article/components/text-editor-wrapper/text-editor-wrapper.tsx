import useCreateArticleStore from "@/pages/create-article/store";
import type { Value } from "@udecode/plate";
import TextEditor, { type TextEditorProps } from "@/components/text-editor";
import { EditorEventEmitter } from "@/components/text-editor/text-editor-context";

export const textEditorValueEmitter = new EditorEventEmitter<Value>();

export const TextEditorWithEmitter: React.FC<TextEditorProps> = ({
  onContentChanged,
  ...props
}) => {
  return (
    <TextEditor
      onContentChanged={(value) => {
        textEditorValueEmitter.emit(value);
        onContentChanged?.(value);
      }}
      {...props}
    />
  );
};

export const TextEditorWithEmitterAndStore: React.FC<TextEditorProps> = (
  props
) => {
  const { setPayload } = useCreateArticleStore((state) => state.actions);

  return (
    <TextEditorWithEmitter
      onContentChanged={(value) => {
        setPayload({ content: JSON.stringify(value) });
      }}
      onTitleChanged={(value) => {
        setPayload({ title: value });
      }}
      onDescriptionChanged={(value) => {
        setPayload({ description: value });
      }}
      onCoverImageChanged={(value) => {
        setPayload({ coverImage: value });
      }}
      {...props}
    />
  );
};
