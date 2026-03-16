import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  base: isProd ? "/admin/" : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: isProd
      ? path.resolve(import.meta.dirname, "../pizzon/dist/public/admin")
      : path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 5174,
    host: "0.0.0.0",
  },
});
