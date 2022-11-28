import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, loadEnv, splitVendorChunkPlugin } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    build: {
      outDir: "dist",
    },
    plugins: [
      splitVendorChunkPlugin(),
      visualizer(),
      createHtmlPlugin({
        inject: {
          data: {
            title: process.env.VITE_PROJECT_NAME,
          },
        },
      }),
      react({
        jsxImportSource: "@emotion/react",
        babel: {
          plugins: ["@emotion/babel-plugin"],
        },
      }),
    ],
  });
};
