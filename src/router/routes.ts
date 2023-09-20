import React from "react"
import { RouteObject } from "react-router-dom"
import HomeView from "@/pages/home"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: React.createElement(HomeView),
  },
]
