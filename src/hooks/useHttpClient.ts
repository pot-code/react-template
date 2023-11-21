import http, { HttpError } from "@/core/http"

interface PostParams {
  data?: any
  queries?: any
}

interface GetParams {
  params?: any
  signal?: AbortSignal
}

export function useHttpClient() {
  function onCatch(err: HttpError) {
    console.error("HTTP error:", err)
  }

  return {
    async post<T = any>(url: string, params?: PostParams) {
      return http.post<T>(url, params?.data, { params: params?.queries }).catch((err: HttpError) => {
        onCatch(err)
        throw err
      })
    },
    async get<T = any>(url: string, params?: GetParams) {
      return http.get<T>(url, params).catch((err: HttpError) => {
        onCatch(err)
        throw err
      })
    },
    async put<T = any>(url: string, params?: PostParams) {
      return http.put<T>(url, params?.data, { params: params?.queries }).catch((err: HttpError) => {
        onCatch(err)
        throw err
      })
    },
    async delete<T = any>(url: string, params?: any) {
      return http.delete<T>(url, { params }).catch((err: HttpError) => {
        onCatch(err)
        throw err
      })
    },
  }
}
