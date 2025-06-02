import { IonButton } from "@ionic/react"

type IonButtonProps = React.ComponentProps<typeof IonButton>

type ButtonProps = IonButtonProps

const Button = ({ children, ...props }: ButtonProps) => {
    return <IonButton {...props}>{children}</IonButton>
}

export default Button
