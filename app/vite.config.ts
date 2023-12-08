import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 8080,
    },
    resolve: { alias: [{ find: "@", replacement: "/src" }] },
    build: {
        outDir: "../dist",
    },
});
