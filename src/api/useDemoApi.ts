import { useHttpClient } from "@/provider/http"

export default function useDemoApi() {
  const client = useHttpClient()
  return {
    hello: () => client.get<HttpResponse<string>>("/hello"),
  }
}
