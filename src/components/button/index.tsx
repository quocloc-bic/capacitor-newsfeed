import { IonButton, IonSpinner } from "@ionic/react";
import styles from "./style.module.css";
import { cn } from "@/utils/globals";

type IonButtonProps = React.ComponentProps<typeof IonButton>;

interface ButtonProps extends IonButtonProps {
  loading?: boolean;
  noPadding?: boolean;
}

const Button = ({
  children,
  className,
  loading,
  noPadding = false,
  ...props
}: ButtonProps) => {
  return (
    <IonButton
      {...props}
      mode="ios"
      disabled={loading || props.disabled}
      className={cn(
        noPadding ? styles["button-no-padding"] : styles["button"],
        className,
        props.disabled && "opacity-50",
        loading && "opacity-50"
      )}
    >
      {loading && <IonSpinner name="crescent" slot="start" className="mr-2" />}
      {children}
    </IonButton>
  );
};

export default Button;
