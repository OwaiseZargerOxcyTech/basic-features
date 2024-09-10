//T ypeScript Configuration:
// Ensure that TypeScript recognizes your environment variables by extending the vite-env.d.ts
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // add other variables as needed
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}



