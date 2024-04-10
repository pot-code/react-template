import { HttpResponse, delay, http } from "msw"

export const handlers = [
  http.get("/mock/hello", async () => {
    await delay(500)
    return HttpResponse.json({
      code: 500,
      msg: null,
      data: "hello",
    })
  }),
]
