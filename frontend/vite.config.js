import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

export default ({ mode }) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    return defineConfig({
        plugins: [react()],
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
            },
        },
    });
};
