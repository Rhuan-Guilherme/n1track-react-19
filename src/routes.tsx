import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./pages/_layouts/appLayout";
import { AuthLayout } from "./pages/_layouts/authLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [{ path: "/", element: <h1>Home Page</h1> }],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/sing-in", element: <h1>Sing-in</h1> },
      { path: "/sing-out", element: <h1>Sing-out</h1> },
    ],
  },
]);
