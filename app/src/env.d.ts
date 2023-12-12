interface ImportMetaEnv {
    readonly VITE_API_KEY: string;
    readonly VITE_CHANNEL_ID: string;
    readonly VITE_SUPABASE_URL: string;
    readonly VITE_SUPABASE_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
