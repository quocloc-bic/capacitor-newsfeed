import * as React from "react";

import { PlaceholderPlugin, UploadErrorCode } from "@udecode/plate-media/react";
import { usePluginOption } from "@udecode/plate/react";
import useAlertPresenter from "@/shared/hooks/use-alert-presenter";

export const useUploadErrorToast = () => {
  const { showToast } = useAlertPresenter();
  const uploadError = usePluginOption(PlaceholderPlugin, "error");

  React.useEffect(() => {
    if (!uploadError) return;

    const { code, data } = uploadError;

    switch (code) {
      case UploadErrorCode.INVALID_FILE_SIZE: {
        showToast(
          `The size of files ${data.files
            .map((f) => f.name)
            .join(", ")} is invalid`,
          "error"
        );

        break;
      }
      case UploadErrorCode.INVALID_FILE_TYPE: {
        showToast(
          `The type of files ${data.files
            .map((f) => f.name)
            .join(", ")} is invalid`,
          "error"
        );

        break;
      }
      case UploadErrorCode.TOO_LARGE: {
        showToast(
          `The size of files ${data.files
            .map((f) => f.name)
            .join(", ")} is too large than ${data.maxFileSize}`,
          "error"
        );

        break;
      }
      case UploadErrorCode.TOO_LESS_FILES: {
        showToast(
          `The mini um number of files is ${data.minFileCount} for ${data.fileType}`,
          "error"
        );

        break;
      }
      case UploadErrorCode.TOO_MANY_FILES: {
        showToast(
          `The maximum number of files is ${data.maxFileCount} ${
            data.fileType ? `for ${data.fileType}` : ""
          }`,
          "error"
        );

        break;
      }
    }
  }, [uploadError]);
};

export const MediaUploadToast = () => {
  useUploadErrorToast();

  return null;
};
