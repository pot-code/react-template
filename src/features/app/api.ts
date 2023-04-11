import http from "@/lib/http"

export class DemoAPI {
  static hello() {
    return http.get<string>("/hello")
  }
}
