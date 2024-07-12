import { defineConfig } from "orval"

const modules = ["demo"]

export default defineConfig(
  Object.fromEntries(
    modules.map((name) => [
      name,
      {
        input: {
          target: "openapi/demo.yaml",
          filters: {
            tags: [name],
          },
        },
        output: {
          prettier: true,
          schemas: `./src/api/model`,
          target: `./src/api/${name}.ts`,
          override: {
            mutator: {
              path: "src/lib/http/instance.ts",
              name: "customInstance",
            },
          },
        },
      },
    ]),
  ),
)
