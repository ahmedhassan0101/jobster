// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    // تحذير إذا تجاوز chunk معين 500KB
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // فصل المكتبات الكبيرة في chunk منفصل
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "redux-vendor": ["@reduxjs/toolkit", "react-redux"],
          "charts-vendor": ["recharts"],
          "styled-vendor": ["styled-components"],
        },
      },
    },
  },
});
