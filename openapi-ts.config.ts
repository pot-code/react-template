import { defineConfig } from "@hey-api/openapi-ts"

export default defineConfig({
  input: "./openapi/schema.json",
  output: "./src/gen/api",
  schemas: false,
  lint: "eslint",
})
