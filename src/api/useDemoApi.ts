import { HttpResponse } from "@/core/http"
import { useHttpClient } from "@/hooks/useHttpClient"

export default function useDemoApi() {
  const client = useHttpClient()
  return {
    hello: () => client.get<HttpResponse<string>>("/hello"),
  }
}
