import {
  IonButtons,
  IonIcon,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import TableOfContents from "./components/table-of-contents/table-of-contents";
import { useDevice } from "../../hooks/use-device";
import { chevronBack, menu } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import CollapsibleView from "../../components/collapsible-view";
import Divider from "../../components/divider";
import Button from "@/components/button";
import Header from "@/components/header";
import { TextEditorWithEmitterAndStore } from "./components/text-editor-wrapper/text-editor-wrapper";
import useCreateArticle from "./create-article-page.hook";
import Content from "@/components/content";

const CreateArticlePage: React.FC = () => {
  const { isMobile } = useDevice();
  const history = useHistory();
  const { onPost, loading, isSubmitDisabled } = useCreateArticle();

  const onClose = () => {
    history.goBack();
  };

  return (
    <>
      <IonMenu contentId="main-content" side="end">
        <Header>
          <IonToolbar>
            <IonTitle>{textConstants.tableOfContents}</IonTitle>
          </IonToolbar>
        </Header>
        <Content className="ion-padding">
          <TableOfContents />
        </Content>
      </IonMenu>
      <IonPage id="main-content">
        <Header hidden={!isMobile}>
          <IonToolbar>
            <IonButtons slot="start">
              <Button
                fill="clear"
                color="dark"
                onClick={() => history.goBack()}
              >
                <IonIcon icon={chevronBack} />
              </Button>
            </IonButtons>
            <IonTitle className="mx-4">{textConstants.title}</IonTitle>
            <IonButtons slot="end" className="flex gap-2 pr-2">
              <IonMenuToggle className="flex justify-center items-center">
                <IonIcon icon={menu} />
              </IonMenuToggle>
              <Button
                fill="solid"
                color="primary"
                onClick={onPost}
                loading={loading}
                disabled={isSubmitDisabled}
              >
                {textConstants.post}
              </Button>
            </IonButtons>
          </IonToolbar>
        </Header>
        <Content className="h-full">
          <div className="flex h-full bg-gray-50 p-5 justify-center">
            <div className="max-w-screen-md w-full">
              <div className="flex-1 bg-white flex flex-col rounded-lg h-full min-h-0 box-border p-4">
                {/* Text editor */}
                <TextEditorWithEmitterAndStore className="flex-1 min-h-0" />

                <div className="hidden flex-col md:flex">
                  <Divider height={1} className="my-2" />
                  <div className="flex-row items-center flex gap-2">
                    <p>{textConstants.savedDraft}</p>

                    <div className="flex-1" />

                    <Button fill="clear" color="dark" onClick={onClose}>
                      {textConstants.close}
                    </Button>
                    <Button
                      fill="solid"
                      color="primary"
                      onClick={onPost}
                      loading={loading}
                      disabled={isSubmitDisabled}
                    >
                      {textConstants.post}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[250px] ml-5 hidden md:block">
              <CollapsibleView title={textConstants.tableOfContents}>
                <TableOfContents />
              </CollapsibleView>
            </div>
          </div>
        </Content>
      </IonPage>
    </>
  );
};

export default CreateArticlePage;

const textConstants = {
  title: "Create Article",
  savedDraft: "Saved draft at 12:00 PM",
  post: "Post",
  tableOfContents: "Table of Contents",
  close: "Back",
};
