import { IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import { cn } from "@/shared/utils/globals";
import { Button } from "@/shared/components/ui/button";

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
        className="color-primary-foreground bg-brand !rounded-full flex items-center justify-center h-12 w-12 overflow-hidden"
        onClick={onClick}
      >
        <IonIcon slot="icon-only" icon={add} size="large" />
      </Button>
    </div>
  );
};

export default FloatingButton;
