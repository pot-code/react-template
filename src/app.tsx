import { RouterProvider, createRouter } from "@tanstack/react-router"
import { routeTree } from "./routes.gen"

const router = createRouter({ routeTree })

export default function App() {
  return <RouterProvider router={router} />
}
