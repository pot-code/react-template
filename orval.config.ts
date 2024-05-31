import { defineConfig } from "orval"

export default defineConfig({
  flow: {
    input: "openapi/demo.yaml",
    output: "src/api/demo.ts",
  },
})
