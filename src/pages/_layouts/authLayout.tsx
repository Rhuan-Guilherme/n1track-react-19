import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="bg-background grid min-h-screen grid-cols-2">
      <div className="flex flex-col items-center justify-center">
        <Outlet />
      </div>
      <div className="flex flex-col items-center justify-center bg-zinc-900">
        <p className="text-8xl">N1Track</p>
        <p className="text-center">
          Sua nova solução para o gerenciamento eficiente <br /> e registro ágil
          de chamados em 1º nível.
        </p>
      </div>
    </div>
  );
}
