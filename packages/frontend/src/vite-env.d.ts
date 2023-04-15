/// <reference types="vite/client" />
import VueRouter from 'vue-router';
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, unknown>;
  export default component;
}
declare module 'vue3-emoji-picker' {
  import picker from 'vue3-emoji-picker';
  export default picker;
}
interface ImportMetaEnv {
  VITE_CLOUD_STORAGE_OSS_ALIBABA_ACCESS_KY: string;
  VITE_CLOUD_STORAGE_OSS_ALIBABA_BUCKET: string;
  VITE_CLOUD_STORAGE_OSS_ALIBABA_REGION: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
