import { AppClient } from "@/gen/api"

export default new AppClient({
  BASE: import.meta.env.VITE_API_PREFIX,
})
