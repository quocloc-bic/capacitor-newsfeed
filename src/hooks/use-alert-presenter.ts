import { useIonAlert, useIonLoading } from "@ionic/react"

const useAlertPresenter = () => {
    const [showIonAlert, dismissIonAlert] = useIonAlert()
    const [showIonLoading, dismissIonLoading] = useIonLoading()

    const dismissAll = async () => {
        await dismissIonAlert()
        await dismissIonLoading()
    }

    const showErrorAlert = async (message: string) => {
        await dismissAll()
        await showIonAlert({
            message,
            buttons: [{ text: "OK" }],
        })
    }

    const showSuccessAlert = async (message: string) => {
        await dismissAll()
        await showIonAlert({
            message,
            buttons: [{ text: "OK" }],
        })
    }

    const showLoading = async (message: string) => {
        await dismissAll()
        await showIonLoading({
            message,
        })
    }

    return {
        showErrorAlert,
        showSuccessAlert,
        dismissAlert: dismissIonAlert,
        showLoading,
        dismissLoading: dismissIonLoading,
        dismissAll,
    }
}

export default useAlertPresenter
