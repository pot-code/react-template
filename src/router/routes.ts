import React from "react"
import HomeView from "../views/HomeView"
import { RouteItem } from "./type"

export const routes: RouteItem[] = [
  {
    path: "/",
    element: React.createElement(HomeView),
  },
]
