import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./pages/_layouts/appLayout";
import { AuthLayout } from "./pages/_layouts/authLayout";
import { SingIn } from "./pages/auth/sing-in";

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
      { path: "/sing-in", element: <SingIn /> },
      { path: "/sing-out", element: <h1>Sing-out</h1> },
    ],
  },
]);
