import { cn } from "@/shared/utils/globals";
import React, { useEffect, useCallback } from "react";
import Button from "../button";
import { IonIcon, IonImg, IonProgressBar } from "@ionic/react";
import { image as imageIcon } from "ionicons/icons";
import { useFilePicker } from "use-file-picker";
import { useUploadFile } from "@/shared/hooks/use-upload-file";

interface ImageSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  onImageSelected?: (image: string) => void;
  onLoadingChange?: (loading: boolean) => void;
}

const RenderEmptyState = () => (
  <div className="flex flex-col gap-2 items-center justify-center">
    <IonIcon icon={imageIcon} size="large" />
    <p className="text-lg font-bold">{textConstants.title}</p>
    <p className="text-sm text-gray-500">{textConstants.description}</p>
  </div>
);

const RenderImage = ({ url }: { url: string }) => (
  <IonImg src={url} alt="cover" className="w-full h-full object-cover" />
);

const RenderProgress = ({ progress }: { progress: number }) =>
  progress > 0 ? (
    <IonProgressBar
      value={progress}
      className="w-full h-1 absolute bottom-0 left-0"
    />
  ) : null;

const ImageSelector: React.FC<ImageSelectorProps> = ({
  onImageSelected,
  onLoadingChange,
  className,
  ...props
}) => {
  const { isUploading, progress, displayImageUrl, downloadURL, uploadFile } =
    useUploadFile();

  const loading = Boolean(isUploading);

  useEffect(() => {
    onLoadingChange?.(loading);
  }, [loading, onLoadingChange]);

  useEffect(() => {
    if (downloadURL) {
      onImageSelected?.(downloadURL);
    }
  }, [downloadURL, onImageSelected]);

  const { openFilePicker } = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    onFilesSelected: (data: any) => {
      if (!data.plainFiles) return;
      const firstFile = data.plainFiles[0];
      if (firstFile) {
        handleImageSelected(firstFile);
      }
    },
  });

  const handleImageSelected = useCallback(
    (file: File) => {
      uploadFile(file);
    },
    [uploadFile]
  );

  const selectImage = useCallback(() => {
    openFilePicker();
  }, [openFilePicker]);

  const mergedStyles = cn(
    "flex flex-col gap-2 rounded-lg bg-gray-50 justify-center items-center",
    "overflow-hidden",
    className
  );

  return (
    <div {...props} className={mergedStyles}>
      <Button
        fill="clear"
        color="dark"
        noPadding
        className="w-full h-full p-0"
        disabled={loading}
        onClick={selectImage}
      >
        <RenderProgress progress={progress} />
        {displayImageUrl ? (
          <RenderImage url={displayImageUrl} />
        ) : (
          <RenderEmptyState />
        )}
      </Button>
    </div>
  );
};

export default ImageSelector;

const textConstants = {
  title: "Add cover photo",
  description: "Cover image is required",
};
