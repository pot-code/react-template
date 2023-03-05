import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, splitVendorChunkPlugin } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
  },
  plugins: [
    splitVendorChunkPlugin(),
    visualizer(),
    react({
      jsxImportSource: "@emotion/react",
    }),
  ],
});
