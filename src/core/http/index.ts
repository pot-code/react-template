import axios from "axios"
import HttpClient from "./client"
import { captureBusinessError, handleRejection } from "./interceptors"

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_ENDPOINT,
})

axiosInstance.interceptors.response.use(captureBusinessError, handleRejection)

export default new HttpClient(axiosInstance)
export { HttpError } from "./error"
export type { HttpResponse } from "./types"
export { HttpClient }
