export interface HttpResponse<T = unknown> {
  code: number
  msg: string | null
  data: T
}

export interface RequestConfig {
  body?: any
  timeout?: number
  headers?: Record<string, string>
  queries?: Record<string, string>
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE"

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
