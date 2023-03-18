/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENDPOINT: string;
  readonly VITE_WDYR_ENABLED: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
