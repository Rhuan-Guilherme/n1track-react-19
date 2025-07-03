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
import { FormatEmail } from "./pages/app/IA/forrmat-email";
import { User } from "./pages/app/users/user";
import { Metrics } from "./pages/app/metrics/metrics";
import { ForgotPassword } from "./pages/auth/forgout-password";
import { ResetPassword } from "./pages/auth/reset-password";
import { ManagementPage } from "./pages/app/management/management-page";

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
      {
        path: "/ia",
        element: <FormatEmail />,
      },
      {
        path: "/users",
        element: <User />,
      },
      {
        path: "/metrics",
        element: <Metrics />,
      },
      {
        path: "/management",
        element: <ManagementPage />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/sing-in", element: <SingIn /> },
      { path: "/sing-up", element: <SingUp /> },
      { path: "/forgout", element: <ForgotPassword /> },
      { path: "/reset", element: <ResetPassword /> },
    ],
  },
]);
