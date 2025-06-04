import { Plate } from "@udecode/plate/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Editor, EditorContainer } from "@/components/ui/editor";
import { cn } from "@/lib/utils";
import { useCreateEditor } from "./use-create-editor";
import type { Value } from "@udecode/plate";
import { useTextEditorContext } from "./text-editor-context";

interface TextEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  onValueChanged?: (value: Value) => void;
}

const TextEditor = ({
  className,
  onValueChanged,
  ...props
}: TextEditorProps) => {
  const editor = useCreateEditor();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={cn("bg-white", className)} {...props}>
        <Plate
          editor={editor}
          onChange={(options) => {
            onValueChanged?.(options.value);
          }}
        >
          <EditorContainer>
            <Editor
              placeholder="Type your amazing content here...."
              variant="fullWidth"
            />
          </EditorContainer>
        </Plate>
      </div>
    </DndProvider>
  );
};

export default TextEditor;

export const EditorWithContext: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { setValue } = useTextEditorContext();
  return <TextEditor className={className} onValueChanged={setValue} />;
};
