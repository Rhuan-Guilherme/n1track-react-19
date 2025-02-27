import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./pages/_layouts/appLayout";
import { AuthLayout } from "./pages/_layouts/authLayout";
import { SingIn } from "./pages/auth/sing-in";
import { SingUp } from "./pages/auth/sing-up";
import { Home } from "./pages/app/home";
import { CalledForm } from "./pages/app/forms/called-form";
import { FallForm } from "./pages/app/forms/fall-form";
import { TransferForm } from "./pages/app/forms/transfer-form";
import { ReiterationForm } from "./pages/app/forms/reiteration-form";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          { path: "/", element: <CalledForm /> },
          { path: "/queda", element: <FallForm /> },
          { path: "/transferencia", element: <TransferForm /> },
          { path: "/reiteracao", element: <ReiterationForm /> },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/sing-in", element: <SingIn /> },
      { path: "/sing-up", element: <SingUp /> },
    ],
  },
]);
