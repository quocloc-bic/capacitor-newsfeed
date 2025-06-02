/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_UPLOADTHING_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
