import axios from "axios"
import { HttpClient } from "@/core/http"

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_PREFIX,
})

const client = new HttpClient(axiosInstance)

export default function useHttpClient() {
  return { client }
}
