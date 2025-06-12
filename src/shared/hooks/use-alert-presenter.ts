import {
  useIonAlert,
  useIonLoading,
  useIonToast,
  type AlertButton,
} from "@ionic/react";

const useAlertPresenter = () => {
  const [showIonAlert, dismissIonAlert] = useIonAlert();
  const [showIonToast, dismissIonToast] = useIonToast();
  const [showIonLoading, dismissIonLoading] = useIonLoading();

  const dismissAll = async () => {
    await dismissIonAlert();
    await dismissIonLoading();
    await dismissIonToast();
  };

  const showConfirmationAlert = async (
    message: string,
    buttons: AlertButton[]
  ) => {
    const defaultButtons = [{ text: "Cancel", role: "cancel" }];

    await dismissAll();
    await showIonAlert({
      message,
      buttons: [...defaultButtons, ...buttons],
    });
  };

  const showErrorAlert = async (error: Error | string | unknown) => {
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

  const showToast = async (
    message: string,
    type: "info" | "success" | "warning" | "error" = "info"
  ) => {
    await dismissAll();
    await showIonToast({
      message,
      color: type,
    });

    setTimeout(() => {
      dismissIonToast();
    }, 2000);
  };

  return {
    showErrorAlert,
    showSuccessAlert,
    dismissAlert: dismissIonAlert,
    showLoading,
    dismissLoading: dismissIonLoading,
    dismissAll,
    showToast,
    dismissToast: dismissIonToast,
    showConfirmationAlert,
  };
};

export default useAlertPresenter;
