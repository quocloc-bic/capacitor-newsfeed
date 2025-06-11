import React from "react";
import { IonModal, IonContent } from "@ionic/react";

interface BottomSheetProps {
  isOpen: boolean;
  onDidDismiss: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onDidDismiss,
  children,
  title,
  className = "",
}) => {
  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onDidDismiss}
      className={`bottom-sheet-modal ${className}`}
      initialBreakpoint={0.2}
      breakpoints={[0, 0.2, 0.75, 1]}
      handleBehavior="cycle"
      backdropDismiss
      showBackdrop
      mode="ios"
    >
      <IonContent className="ion-padding">
        {title && (
          <div
            className="bottom-sheet-title"
            style={{ textAlign: "center", fontWeight: 600, marginBottom: 16 }}
          >
            {title}
          </div>
        )}
        {children}
      </IonContent>
    </IonModal>
  );
};

export default BottomSheet;
