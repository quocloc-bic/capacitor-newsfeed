import { useDevice } from "@/shared/hooks/use-device";
import { IonContent } from "@ionic/react";

type ContentProps = React.ComponentProps<typeof IonContent>;

const Content = (props: ContentProps) => {
  const { isMobilePlatform } = useDevice();

  return (
    <IonContent
      data-mode={isMobilePlatform ? "mobile" : "desktop"}
      {...props}
    />
  );
};

export default Content;
