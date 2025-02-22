import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <>
      <h1>Auth Layout</h1>
      <Outlet />
    </>
  );
}
