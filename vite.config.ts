import react from "@vitejs/plugin-react-swc"
import { fileURLToPath, URL } from "node:url"
import { visualizer } from "rollup-plugin-visualizer"
import UnoCSS from "unocss/vite"
import { defineConfig, splitVendorChunkPlugin } from "vite"

export default defineConfig({
  build: {
    outDir: "dist",
  },
  plugins: [splitVendorChunkPlugin(), visualizer(), react(), UnoCSS()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
