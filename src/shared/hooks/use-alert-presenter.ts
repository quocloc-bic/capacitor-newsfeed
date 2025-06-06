import { useIonAlert, useIonLoading } from "@ionic/react";

const useAlertPresenter = () => {
  const [showIonAlert, dismissIonAlert] = useIonAlert();
  const [showIonLoading, dismissIonLoading] = useIonLoading();

  const dismissAll = async () => {
    await dismissIonAlert();
    await dismissIonLoading();
  };

  const showErrorAlert = async (error: any) => {
    let message = "An unknown error occurred";
    if (error instanceof Error) {
      message = error.message;
    }

    if (typeof error === "string") {
      message = error;
    }

    await dismissAll();
    await showIonAlert({
      message,
      buttons: [{ text: "OK" }],
    });
  };

  const showSuccessAlert = async (message: string) => {
    await dismissAll();
    await showIonAlert({
      message,
      buttons: [{ text: "OK" }],
    });
  };

  const showLoading = async (message: string) => {
    await dismissAll();
    await showIonLoading({
      message,
    });
  };

  return {
    showErrorAlert,
    showSuccessAlert,
    dismissAlert: dismissIonAlert,
    showLoading,
    dismissLoading: dismissIonLoading,
    dismissAll,
  };
};

export default useAlertPresenter;
