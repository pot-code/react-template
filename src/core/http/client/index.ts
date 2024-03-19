import axios, { AxiosInstance } from "axios"
import { merge } from "lodash-es"
import { Time } from "@/utils/duration"
import { HttpError } from "../error"
import { HttpClient } from "./client"

export class AxiosHttpClient extends HttpClient {
  private readonly axiosInstance: AxiosInstance

  constructor(baseURL: string) {
    super()
    this.axiosInstance = axios.create({ baseURL })
  }

  async request<T = unknown>(method: HttpMethod, uri: string, config?: RequestConfig | undefined): Promise<T> {
    const defaultRequestConfig = {
      timeout: 10 * Time.Second,
    }
    const mergedConfig: RequestConfig = merge(defaultRequestConfig, config)

    return this.axiosInstance
      .request<T>({
        url: uri,
        method,
        timeout: mergedConfig.timeout,
        params: mergedConfig?.queries,
        headers: mergedConfig?.headers,
        data: mergedConfig?.body,
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
