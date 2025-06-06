import { IonHeader } from "@ionic/react";

type HeaderProps = React.ComponentProps<typeof IonHeader>;

const Header = (props: HeaderProps) => {
  return <IonHeader {...props} mode="ios" />;
};

export default Header;
