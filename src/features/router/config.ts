import { RouteObject } from "react-router-dom";

export interface RouteItem {
  index?: boolean;
  label?: string;
  path: string;
  icon?: React.ReactNode;
  element?: React.ReactNode;
  children?: RouteItem[];
  navKey?: string; // 转换为导航菜单项时对应到 ItemType 的 key 字段
  invisibleToMenu?: boolean; // 导航菜单内不展示
}

export type RouterConfig = RouteItem[];

export function createRoutesFromConfig(config: RouterConfig): RouteObject[] {
  function mapping(item: RouteItem): RouteObject {
    const { path, index, element, children } = item;
    const route: RouteObject = {
      path,
      index,
      element,
    };
    if (children) {
      route.children = children.map(mapping);
    }
    return route;
  }
  return config.map(mapping);
}
