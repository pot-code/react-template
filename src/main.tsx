import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import { createRoot } from "react-dom/client"

import App from "./app"
import { AxiosHttpClient } from "./core/http"
import { HttpClientProvider } from "./provider/http"
import setup from "./setup"

import "./styles/main.scss"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
})
const httpClient = new AxiosHttpClient({
  baseURL: import.meta.env.VITE_API_PREFIX,
})

const root = createRoot(document.getElementById("root") as Element)

setup().then(() =>
  root.render(
    <QueryClientProvider client={queryClient}>
      <HttpClientProvider client={httpClient}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </HttpClientProvider>
    </QueryClientProvider>,
  ),
)
