/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_ROUTE: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }