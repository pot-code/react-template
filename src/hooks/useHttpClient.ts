import http, { HttpError } from "@/core/http"

export function useHttpClient() {
  function onCatch(err: HttpError) {
    console.error("HTTP error:", err)
  }

  return {
    async post<T = any>(url: string, config?: RequestConfig) {
      return http.post<T>(url, config).catch((err: HttpError) => {
        onCatch(err)
        throw err
      })
    },
    async get<T = any>(url: string, config?: RequestConfig) {
      return http.get<T>(url, config).catch((err: HttpError) => {
        onCatch(err)
        throw err
      })
    },
    async put<T = any>(url: string, config?: RequestConfig) {
      return http.put<T>(url, config).catch((err: HttpError) => {
        onCatch(err)
        throw err
      })
    },
    async delete<T = any>(url: string, config: RequestConfig) {
      return http.delete<T>(url, config).catch((err: HttpError) => {
        onCatch(err)
        throw err
      })
    },
  }
}
