import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import { createRoot } from "react-dom/client"

import setup from "./setup"

import { RouterProvider, createRouter } from "@tanstack/react-router"
import { routeTree } from "./routes.gen"
import "./styles/main.scss"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
})

const root = createRoot(document.getElementById("root") as Element)
const router = createRouter({ routeTree })

setup().then(() =>
  root.render(
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </QueryClientProvider>,
  ),
)
