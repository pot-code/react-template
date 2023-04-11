import React from "react"
import { RouterConfig } from "./type"
import HomeView from "../views/HomeView"

export const routes: RouterConfig = [
  {
    path: "/",
    element: React.createElement(HomeView),
  },
]
