import { IonItem, IonLabel } from "@ionic/react";
import { IonAccordionGroup } from "@ionic/react";
import { IonAccordion } from "@ionic/react";
import "./style.css";

interface CollapsibleViewProps {
  title: string;
  children: React.ReactNode;
}

const CollapsibleView: React.FC<CollapsibleViewProps> = ({
  title,
  children,
}) => {
  return (
    <div className="rounded-md overflow-hidden">
      <IonAccordionGroup>
        <IonAccordion color="light">
          <IonItem slot="header">
            <IonLabel className="text-lg font-bold">{title}</IonLabel>
          </IonItem>
          <div slot="content">{children}</div>
        </IonAccordion>
      </IonAccordionGroup>
    </div>
  );
};

export default CollapsibleView;
