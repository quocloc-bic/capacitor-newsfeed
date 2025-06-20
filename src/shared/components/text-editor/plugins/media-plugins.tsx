import { CaptionPlugin } from "@udecode/plate-caption/react";
import {
  AudioPlugin,
  FilePlugin,
  ImagePlugin,
  MediaEmbedPlugin,
  PlaceholderPlugin,
  VideoPlugin,
} from "@udecode/plate-media/react";

import { ImagePreview } from "@/shared/components/ui/image-preview";
import { MediaUploadToast } from "@/shared/components/ui/media-upload-toast";

export const mediaPlugins = [
  ImagePlugin.extend({
    options: { disableUploadInsert: true },
    render: { afterEditable: ImagePreview },
  }),
  MediaEmbedPlugin,
  VideoPlugin,
  AudioPlugin,
  FilePlugin,
  CaptionPlugin.configure({
    options: {
      plugins: [
        ImagePlugin,
        VideoPlugin,
        AudioPlugin,
        FilePlugin,
        MediaEmbedPlugin,
      ],
    },
  }),
  PlaceholderPlugin.configure({
    options: {
      disableEmptyPlaceholder: true,
      uploadConfig: {
        image: {
          maxFileSize: "8MB",
          maxFileCount: 3,
          minFileCount: 1,
          mediaType: ImagePlugin.key,
        },
        video: {
          maxFileSize: "128MB",
          maxFileCount: 1,
          minFileCount: 1,
          mediaType: VideoPlugin.key,
        },
      },
    },
    render: { afterEditable: MediaUploadToast },
  }),
] as const;
