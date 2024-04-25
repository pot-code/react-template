import react from "@vitejs/plugin-react-swc"
import { fileURLToPath, URL } from "node:url"
import { visualizer } from "rollup-plugin-visualizer"
import AutoImport from "unplugin-auto-import/vite"
import { defineConfig } from "vite"

const cdn = {
  react: "https://esm.sh/react@18.2.0",
  "react-dom": "https://esm.sh/react-dom@18.2.0",
  "react-router-dom": "https://esm.sh/react-router-dom@6.22.3",
}

export default defineConfig(({ mode }) => ({
  build: {
    emptyOutDir: true,
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) return "vendor"
        },
      },
    },
  },
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
    }),
    visualizer(),
    AutoImport({
      imports: ["react", "react-router-dom"],
      dirs: ["./src/components", "./src/hooks"],
      dts: "./src/types/auto-imports.d.ts",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      ...(mode === "development" ? {} : cdn),
    },
  },
}))
