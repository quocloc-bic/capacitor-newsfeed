import { Plate } from "@udecode/plate/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Editor, EditorContainer } from "@/components/ui/editor";
import { cn } from "@/lib/utils";
import { useCreateEditor } from "./use-create-editor";

type TextEditorProps = React.HTMLAttributes<HTMLDivElement>;

const TextEditor = ({ className, ...props }: TextEditorProps) => {
  const editor = useCreateEditor();

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={cn(
          "bg-white border border-red-400 flex justify-center items-center",
          className
        )}
        {...props}
      >
        <Plate editor={editor}>
          <EditorContainer>
            <Editor
              placeholder="Type your amazing content here...."
              variant="demo"
            />
          </EditorContainer>
        </Plate>
      </div>
    </DndProvider>
  );
};

export default TextEditor;
