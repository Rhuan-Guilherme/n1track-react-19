import { Outlet } from "react-router-dom";
import logo from "@/assets/logo.svg";
export function AuthLayout() {
  return (
    <div className="bg-background min-h-screen lg:grid lg:grid-cols-2">
      <div className="bg-muted hidden flex-col items-center justify-center gap-10 lg:flex">
        <img
          src={logo}
          alt="Logo n1trakc - headset azul"
          className="animate-pulse"
        />
        <div className="text-center">
          <p className="font-robotoMono text-6xl lg:text-8xl">N1Track</p>
          <p className="font-poppins text-center">
            Sua nova solução para o gerenciamento eficiente <br /> e registro
            ágil de chamados em 1º nível.
          </p>
        </div>
      </div>
      <div className="flex h-screen flex-col items-center justify-center gap-20">
        <div className="flex flex-col items-center gap-3 lg:hidden">
          <img className="w-5" src={logo} alt="" />
          <p className="font-robotoMono font-semibold">N1Trakc</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
