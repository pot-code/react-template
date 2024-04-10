import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createRoot } from "react-dom/client"

import App from "./app"
import setup from "./setup"
import { HttpError } from "./core/http"

import "./styles/main.scss"
import { HttpClientProvider } from "./provider/http"
import { AxiosHttpClient } from "./core/http/client"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry(failureCount, error) {
        if (error instanceof HttpError && [401, 403, 500].indexOf(error.code) > -1) {
          return false
        }
        return failureCount < 3
      },
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
