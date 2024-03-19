type HttpMethod = "GET" | "POST" | "PUT" | "DELETE"

declare interface HttpResponse<T = unknown> {
  code: number
  msg: string | null
  data: T
}

declare interface RequestConfig {
  body?: any
  timeout?: number
  headers?: Record<string, string>
  queries?: Record<string, string>
}
