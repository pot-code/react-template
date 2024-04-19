import { AppClient } from "@/gen/api"

const client = new AppClient({
  BASE: import.meta.env.VITE_API_PREFIX,
})

export default function useHttpClient() {
  return client
}
