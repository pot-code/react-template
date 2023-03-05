import React from "react";
import { RouterConfig } from "./lib/router/type";
import Home from "./pages/Home";

export const routes: RouterConfig = [
  {
    path: "/",
    element: React.createElement(Home),
  },
];
