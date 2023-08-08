import axios from "axios"
import { handleBusinessError, handleRejection } from "./interceptors"

const http = axios.create({
  baseURL: import.meta.env.VITE_API_PREFIX,
})

http.interceptors.response.use(handleBusinessError, handleRejection)

export default http
