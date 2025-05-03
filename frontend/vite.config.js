import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { VitePWA } from "vite-plugin-pwa";
import pkg from "./package.json";

const manifestForPlugIn = {
    registerType: "prompt",
    manifest: {
        name: "Robinson",
        short_name: "Robinson",
        description: "Your personal library manager",
        icons: [
            {
                src: "/web-app-manifest-192x192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "favicon",
            },
            {
                src: "/web-app-manifest-512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "favicon",
            },
            {
                src: "/apple-touch-icon.png",
                sizes: "180x180",
                type: "image/png",
                purpose: "apple touch icon",
            },
            {
                src: "/web-app-manifest-512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any maskable",
            },
        ],
        theme_color: "#1976d2",
        background_color: "#1976d2",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait",
    },
};

export default () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    return defineConfig({
        plugins: [react(), VitePWA(manifestForPlugIn)],
        server: {
            port: 3000,
            host: true,
            proxy: {
                ["/api"]: {
                    target: "http://backend:3100",
                    rewrite: (pathString) => pathString.replace(`/api`, "/api"),
                    ws: true,
                    xfwd: true,
                },
            },
        },
        build: {
            outDir: "build",
            emptyOutDir: true,
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, ""),
                "@cards": path.resolve(__dirname, "./src/cards"),
                "@components": path.resolve(__dirname, "./src/components"),
                "@dialogs": path.resolve(__dirname, "./src/dialogs"),
                "@routes": path.resolve(__dirname, "./src/routes"),
                "@utils": path.resolve(__dirname, "./src/utils"),
                "@fonts": path.resolve(__dirname, "./src/fonts"),
                "@contexts": path.resolve(__dirname, "./src/contexts"),
            },
        },
        define: {
            __APP_VERSION__: JSON.stringify(pkg.version),
        },
    });
};
