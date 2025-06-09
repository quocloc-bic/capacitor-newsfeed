import { useDevice } from "@/shared/hooks/use-device";
import { IonContent } from "@ionic/react";

type ContentProps = React.ComponentProps<typeof IonContent>;

const Content = (props: ContentProps) => {
  const { isMobilePlatform, isMobile } = useDevice();

  return (
    <IonContent
      data-mode={isMobilePlatform && isMobile ? "mobile" : "desktop"}
      {...props}
    />
  );
};

export default Content;
