import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";




export default defineConfig({
  plugins: [react(), VitePWA({
    manifest: {
      name: 'Notes',
      short_name: 'Notes',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'notes.png',
          sizes: '64x64',
          type: 'image/png'
        },
        {
          src: 'notes.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'notes.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: 'notes.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ],
    },
    workbox: {
      maximumFileSizeToCacheInBytes: 15 * 1024 * 1024, // 4 MiB limit
    },
    devOptions: {
      enabled: true,
      type: "module",
    }
  }),],
  define: {
    global: {},
  },
  resolve: {
    mainFields: ["browser"],

    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: false, // Disable source maps
  },
});
