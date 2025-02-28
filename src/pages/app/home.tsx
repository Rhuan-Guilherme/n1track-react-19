import { ButtonSelectForm } from "@/components/button-select-form";
import CardsComponent from "@/components/cards";
import { BellRing, PhoneForwarded, PhoneOff, ScrollText } from "lucide-react";
import { Outlet } from "react-router-dom";

export function Home() {
  return (
    <>
      <div className="flex items-center justify-center gap-3">
        <ButtonSelectForm to="/">
          <ScrollText className="h-5 w-5" />
          Chamado
        </ButtonSelectForm>
        <ButtonSelectForm to="/reiteracao">
          <BellRing className="h-5 w-5" />
          Reiteração
        </ButtonSelectForm>
        <ButtonSelectForm to="/transferencia">
          <PhoneForwarded className="h-5 w-5" />
          Transferência
        </ButtonSelectForm>
        <ButtonSelectForm to="/queda">
          <PhoneOff className="h-5 w-5" />
          Queda
        </ButtonSelectForm>
      </div>
      <section className="mt-10 flex justify-center">
        <Outlet />
      </section>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
        <CardsComponent />
        <CardsComponent />
        <CardsComponent />
        <CardsComponent />
        <CardsComponent />
        <CardsComponent />
        <CardsComponent />
        <CardsComponent />
        <CardsComponent />
        <CardsComponent />
        <CardsComponent />
        <CardsComponent />
      </div>
    </>
  );
}
