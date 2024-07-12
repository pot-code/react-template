import { QueryClient } from "@tanstack/react-query"
import axios from "axios"

function retry(failureCount: number, error: Error) {
  if (axios.isAxiosError(error) && error.response && [401, 403, 500, 404, 400].includes(error.response.status)) {
    return false
  }
  return failureCount < 3
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry,
    },
    mutations: {
      retry,
    },
  },
})

export default queryClient
