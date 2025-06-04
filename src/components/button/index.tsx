import { IonButton } from "@ionic/react";
import styles from "./style.module.css";
import { cn } from "@/utils/globals";

type IonButtonProps = React.ComponentProps<typeof IonButton>;

type ButtonProps = IonButtonProps;

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <IonButton {...props} mode="ios" className={cn(styles.button, className)}>
      {children}
    </IonButton>
  );
};

export default Button;
