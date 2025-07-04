import React, { useState, useRef } from "react";
import {
  IonPopover,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import { ellipsisHorizontal } from "ionicons/icons";
import Button from "@/shared/components/button";
import "./options-menu.style.css";
import { useDevice } from "@/shared/hooks/use-device";
import BottomSheet from "../ui/bottom-sheet";

export interface OptionsMenuOption {
  id: string;
  label: string;
  icon: string;
  onClick: () => void;
}

interface OptionsMenuProps {
  options: OptionsMenuOption[];
  triggerIcon?: string;
  className?: string;
  buttonClassName?: string;
  disabled?: boolean;
}

const OptionsMenuContent: React.FC<{
  options: OptionsMenuOption[];
  handleOptionClick: (option: OptionsMenuOption) => void;
}> = ({ options, handleOptionClick }) => {
  return (
    <IonContent>
      <IonList>
        {options.map((option) => (
          <IonItem
            className="menu-item"
            key={option.id}
            button
            onClick={() => handleOptionClick(option)}
          >
            <IonIcon icon={option.icon} slot="start" />
            <IonLabel>{option.label}</IonLabel>
          </IonItem>
        ))}
      </IonList>
    </IonContent>
  );
};

const OptionsMenu: React.FC<OptionsMenuProps> = ({
  options,
  triggerIcon = ellipsisHorizontal,
  className = "",
  buttonClassName = "p-0",
  disabled = false,
}) => {
  const { isMobile } = useDevice();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLIonPopoverElement>(null);
  const triggerId = `options-menu-trigger-${Math.random().toString(36).substr(2, 9)}`;

  const handleOptionClick = (option: OptionsMenuOption) => {
    option.onClick();
    setIsPopoverOpen(false);
  };

  const Popup = isMobile ? BottomSheet : IonPopover;

  return (
    <div className={className}>
      <Button
        fill="clear"
        color="dark"
        className={buttonClassName}
        id={triggerId}
        onClick={() => setIsPopoverOpen(true)}
        disabled={disabled}
      >
        <IonIcon icon={triggerIcon} size="small" slot="icon-only" />
      </Button>

      <Popup
        ref={popoverRef}
        trigger={triggerId}
        isOpen={isPopoverOpen}
        onDidDismiss={() => setIsPopoverOpen(false)}
        showBackdrop={true}
      >
        <OptionsMenuContent
          options={options}
          handleOptionClick={handleOptionClick}
        />
      </Popup>
    </div>
  );
};

export default OptionsMenu;
