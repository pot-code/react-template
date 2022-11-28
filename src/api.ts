import client from "./features/api/client";

export class DemoAPI {
  static hello() {
    return client.get<string>("/hello");
  }
}
