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
