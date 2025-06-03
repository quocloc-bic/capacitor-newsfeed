import { IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FloatingButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick: () => void;
}

const FloatingButton = ({
  onClick,
  className,
  ...props
}: FloatingButtonProps) => {
  const finalClassName = cn("fixed bottom-8 right-4", className);

  return (
    <div className={finalClassName} {...props}>
      <Button
        className="color-white bg-blue-500 rounded-full flex items-center justify-center h-12 w-12"
        onClick={onClick}
      >
        <IonIcon slot="icon-only" icon={add} />
      </Button>
    </div>
  );
};

export default FloatingButton;
