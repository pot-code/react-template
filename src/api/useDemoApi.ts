import { HttpResponse } from "@/core/http"
import useHttpClient from "@/hooks/useHttpClient"

export default function useDemoApi() {
  const { client } = useHttpClient()
  return {
    hello: (signal?: AbortSignal) => client.get<HttpResponse<string>>("/hello", { signal }),
  }
}
