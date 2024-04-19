import { defineConfig } from "@hey-api/openapi-ts"

export default defineConfig({
  input: "./openapi/local-dev.openapi.json",
  output: "./src/gen/api",
  schemas: false,
})
