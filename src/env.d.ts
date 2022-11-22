/// <reference types="vite/client" />
import type { Theme as AppTheme } from "./theme";

interface ImportMetaEnv {
  readonly VITE_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "@emotion/react" {
  export interface Theme extends AppTheme {}
}
