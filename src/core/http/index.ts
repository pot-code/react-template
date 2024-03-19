import { AxiosHttpClient } from "./client"

export default new AxiosHttpClient(import.meta.env.VITE_API_PREFIX)
export { HttpError } from "./error"
