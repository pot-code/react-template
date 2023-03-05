import client from "../../lib/hooks/axios";

export class DemoAPI {
  static hello() {
    return client.get<string>("/hello");
  }
}
