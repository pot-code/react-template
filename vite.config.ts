import react from "@vitejs/plugin-react-swc"
import { fileURLToPath, URL } from "node:url"
import { visualizer } from "rollup-plugin-visualizer"
import AutoImport from "unplugin-auto-import/vite"
import { defineConfig } from "vite"

export default defineConfig({
  build: {
    emptyOutDir: true,
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
  plugins: [
    visualizer(),
    react(),
    AutoImport({
      imports: ["react", "react-router-dom"],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
