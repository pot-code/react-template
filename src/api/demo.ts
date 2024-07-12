/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * local-dev
 * OpenAPI spec version: 1.0.0
 */
import type { GetDemo200 } from "./model"
import { customInstance } from "../lib/http/instance"

type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1]

/**
 * @summary demo
 */
export const getDemo = (options?: SecondParameter<typeof customInstance>) => {
  return customInstance<GetDemo200>({ url: `/demo`, method: "GET" }, options)
}

export type GetDemoResult = NonNullable<Awaited<ReturnType<typeof getDemo>>>