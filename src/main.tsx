import { QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import { createRoot } from "react-dom/client"

import App from "./app"
import setup from "./setup"
import queryClient from "./lib/query-client"

import "./styles/main.scss"

const root = createRoot(document.getElementById("root") as Element)

setup().then(() =>
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>,
  ),
)
