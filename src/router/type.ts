export interface RouteItem {
  index?: boolean
  label?: string
  path: string
  icon?: React.ReactNode
  element?: React.ReactNode
  children?: RouteItem[]
  navKey?: string // 转换为导航菜单项时对应到 ItemType 的 key 字段
  invisibleToMenu?: boolean // 导航菜单内不展示
}

export type RouterConfig = RouteItem[]
