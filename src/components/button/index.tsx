import { IonButton } from "@ionic/react";
import styles from "./style.module.css";
import { cn } from "@/utils/globals";

type IonButtonProps = React.ComponentProps<typeof IonButton>;

interface ButtonProps extends IonButtonProps {
  loading?: boolean;
}

const Button = ({ children, className, loading, ...props }: ButtonProps) => {
  return (
    <IonButton
      {...props}
      mode="ios"
      className={cn(
        styles.button,
        className,
        props.disabled && "opacity-50",
        loading && "opacity-50"
      )}
    >
      {children}
    </IonButton>
  );
};

export default Button;
