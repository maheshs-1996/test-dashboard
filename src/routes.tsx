import { Navigate, RouteObject } from "react-router";
import OnBoard from "./Pages/OnBoard";
import Dashboard from "./Pages/Dashboard";
import AuthProvider from "./providers/Auth";
import { DASHBOARD_PATH, ONBOARD_PATH, ROOT_PATH } from "./constants";

const APPLICATION_ROUTES: RouteObject[] = [
  {
    path: ROOT_PATH,
    element: <AuthProvider />,
    children: [
      {
        path: ROOT_PATH,
        element: <Navigate to={DASHBOARD_PATH} replace />,
      },
      {
        path: DASHBOARD_PATH,
        element: <Dashboard />,
      },
      {
        path: ONBOARD_PATH,
        element: <OnBoard />,
      },
    ],
  },
];

export default APPLICATION_ROUTES;
