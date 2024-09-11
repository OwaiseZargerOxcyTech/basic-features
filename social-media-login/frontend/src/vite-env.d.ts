// / <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_GOOGLE_CLIENT_ID: string;
    readonly VITE_GITHUB_CLIENT_ID: string;
    readonly VITE_GITHUB_CLIENT_SECRET: string;
    readonly VITE_FACEBOOK_CLIENT_ID: string;
    readonly VITE_LINKEDIN_CLIENT_ID: string;
    readonly VITE_LINKEDIN_CLIENT_SECRET: string;
    // Add other variables as needed
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }