import { RouterProvider, createBrowserRouter } from "react-router-dom";
import APPLICATION_ROUTES from "./routes";

function App() {
  const router = createBrowserRouter(APPLICATION_ROUTES);
  return <RouterProvider router={router} />;
}

export default App;
