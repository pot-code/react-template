import client from "@/lib/http/axios";

export class DemoAPI {
  static hello() {
    return client.get<string>("/hello");
  }
}
