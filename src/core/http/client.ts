import axios, { AxiosInstance, CreateAxiosDefaults } from "axios"
import { HttpError } from "./error"

export abstract class HttpClient {
  abstract request<T = unknown>(method: HttpMethod, uri: string, config?: RequestConfig | undefined): Promise<T>

  post<T = unknown>(uri: string, config?: RequestConfig | undefined): Promise<T> {
    return this.request("POST", uri, config)
  }

  get<T = unknown>(uri: string, config?: RequestConfig | undefined): Promise<T> {
    return this.request("GET", uri, config)
  }

  put<T = unknown>(uri: string, config?: RequestConfig | undefined): Promise<T> {
    return this.request("PUT", uri, config)
  }

  delete<T = unknown>(uri: string, config?: RequestConfig | undefined): Promise<T> {
    return this.request("DELETE", uri, config)
  }
}

export class AxiosHttpClient extends HttpClient {
  private readonly axiosInstance: AxiosInstance

  constructor(config?: CreateAxiosDefaults) {
    super()
    this.axiosInstance = axios.create(config)
  }

  async request<T = unknown>(method: HttpMethod, uri: string, config?: RequestConfig | undefined): Promise<T> {
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
