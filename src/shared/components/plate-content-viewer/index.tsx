import type { Value } from "@udecode/plate";
import { Plate, PlateContent } from "@udecode/plate/react";
import { useCreateEditor } from "../text-editor/use-create-editor";
import { EditorContainer } from "../ui/editor";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { cn } from "@/shared/utils/globals";

interface PlateContentViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  value: Value;
}

const PlateContentViewer: React.FC<PlateContentViewerProps> = ({
  value,
  className,
  ...props
}) => {
  const editor = useCreateEditor(
    {
      readOnly: true,
      value,
    },
    [value]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={cn("editor-container", "bg-white", className)} {...props}>
        <Plate editor={editor}>
          <EditorContainer>
            <PlateContent readOnly />
          </EditorContainer>
        </Plate>
      </div>
    </DndProvider>
  );
};

export default PlateContentViewer;
