import axios, { AxiosInstance, CreateAxiosDefaults } from "axios"
import { HttpClient, HttpError, HttpMethod, RequestConfig } from "@/core/http"

export class AxiosHttpClient extends HttpClient {
  private readonly axiosInstance: AxiosInstance

  constructor(config?: CreateAxiosDefaults) {
    super()
    this.axiosInstance = axios.create(config)
  }

  async request<T = unknown>(method: HttpMethod, uri: string, config?: RequestConfig): Promise<T> {
    return this.axiosInstance
      .request<T>({
        url: uri,
        method,
        timeout: config?.timeout,
        params: config?.queries,
        headers: config?.headers,
        data: config?.body,
      })
      .then(({ status, data, statusText }) => {
        if (status !== 200) throw new HttpError(statusText, status)
        return data
      })
      .catch((err) => {
        if (typeof err === "string") throw new HttpError(err, -1)
        throw new HttpError(err.message, -1)
      })
  }
}
