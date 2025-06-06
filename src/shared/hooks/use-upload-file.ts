import { useState } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  StorageError,
} from "firebase/storage";
import { storage } from "@/shared/services/firebase/firebase-config";

export const useUploadFile = () => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<StorageError | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);
  const [displayImageUrl, setDisplayImageUrl] = useState<string | null>(null);
  const [uploadingFile, setUploadingFile] = useState<File | null>(null);

  const uploadFile = (file: File, path = `uploads/${file.name}`) => {
    setIsUploading(true);
    setUploadingFile(file);
    setError(null);
    setProgress(0);
    setDownloadURL(null);
    setDisplayImageUrl(URL.createObjectURL(file));

    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.round(percent));
      },
      (err) => {
        setError(err);
        setIsUploading(false);
        setUploadingFile(null);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);

        setDisplayImageUrl(url);
        setDownloadURL(url);
        setProgress(0);
        setIsUploading(false);
        setUploadingFile(null);
      }
    );
  };

  return {
    uploadFile,
    progress,
    displayImageUrl,
    error,
    isUploading,
    downloadURL,
    uploadingFile,
  };
};
