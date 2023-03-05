import React from "react";
import { RouterConfig } from "./lib/router/type";
import Home from "./pages/home";

export const routes: RouterConfig = [
  {
    path: "/",
    element: React.createElement(Home),
  },
];
