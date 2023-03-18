import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import { createRoutesFromConfig } from "./util";

const router = createBrowserRouter(createRoutesFromConfig(routes));
export default router;
