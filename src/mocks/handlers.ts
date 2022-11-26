import { rest } from "msw";

export const handlers = [rest.get("/api/people", (_, res, ctx) => res(ctx.json([{}])))];
