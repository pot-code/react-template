import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoutesFromConfig } from "./lib/router/util";
import { routes } from "./routes";

const router = createBrowserRouter(createRoutesFromConfig(routes));

function App() {
  return <RouterProvider router={router} />;
}

export default App;
