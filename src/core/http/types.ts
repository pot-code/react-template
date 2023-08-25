export interface HttpResponse<T = unknown> {
  code: number
  msg: string | null
  data: T
}
