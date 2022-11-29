import client from "../../lib/axios";

export class DemoAPI {
  static hello() {
    return client.get<string>("/hello");
  }
}
