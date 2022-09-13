/// <reference types="vite/client" />
interface ImportMetaEnv {
    VITE_GOOGLE_ANALYTICS_TRACKING_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}