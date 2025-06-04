import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import TableOfContents from "./components/table-of-contents";
import { useDevice } from "../../hooks/use-device";
import { chevronBack, menu } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import CollapsibleView from "../../components/collapsible-view";
import Divider from "../../components/divider";
import Button from "@/components/button";
import { TextEditorProvider } from "../../components/text-editor/text-editor-context";
import { EditorWithContext } from "../../components/text-editor";

const CreateArticlePage: React.FC = () => {
  const { isMobile } = useDevice();
  const history = useHistory();

  const onPost = () => {
    console.log("post");
  };

  return (
    <TextEditorProvider>
      <IonMenu contentId="main-content" side="end">
        <IonHeader>
          <IonToolbar>
            <IonTitle>{textConstants.tableOfContents}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <TableOfContents />
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader hidden={!isMobile}>
          <IonToolbar>
            <IonButtons slot="start">
              <Button onClick={() => history.goBack()}>
                <IonIcon icon={chevronBack} />
              </Button>
            </IonButtons>
            <IonTitle className="mx-4">{textConstants.title}</IonTitle>
            <IonButtons slot="end" className="flex gap-2 pr-2">
              <IonMenuToggle className="flex justify-center items-center">
                <IonIcon icon={menu} />
              </IonMenuToggle>
              <Button fill="solid" color="primary" onClick={onPost}>
                {textConstants.post}
              </Button>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="h-full">
          <div className="flex h-full bg-gray-50 p-5">
            <div className="flex-1 bg-white flex flex-col rounded-lg h-full min-h-0 box-border p-4">
              <EditorWithContext className="flex-1 min-h-0" />
              <div className="hidden flex-col md:flex">
                <Divider height={1} className="my-2" />
                <div className="flex-row justify-between items-center flex">
                  <p>{textConstants.savedDraft}</p>
                  <Button fill="solid" onClick={onPost}>
                    {textConstants.post}
                  </Button>
                </div>
              </div>
            </div>

            <div className="w-[250px] ml-5 hidden md:block">
              <CollapsibleView title={textConstants.tableOfContents}>
                <TableOfContents />
              </CollapsibleView>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </TextEditorProvider>
  );
};

export default CreateArticlePage;

const textConstants = {
  title: "Create Article",
  savedDraft: "Saved draft at 12:00 PM",
  post: "Post",
  tableOfContents: "Table of Contents",
};
