import { RouteObject } from "react-router-dom"
import { RouterConfig, RouteItem } from "./type"

export function createRoutesFromConfig(config: RouterConfig): RouteObject[] {
  function mapping(item: RouteItem): RouteObject {
    const { path, index, element, children } = item
    const route: RouteObject = {
      path,
      index,
      element,
    }
    if (children) {
      route.children = children.map(mapping)
    }
    return route
  }
  return config.map(mapping)
}
