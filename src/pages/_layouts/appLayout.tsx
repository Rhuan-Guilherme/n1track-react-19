import { AppSidebar } from "@/components/app-sidebar";
import { ButtonSelectForm } from "@/components/button-select-form";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { BellRing, PhoneForwarded, PhoneOff, ScrollText } from "lucide-react";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <main className="m-2 h-screen w-full pt-10">
        <div className="flex items-center justify-center gap-3">
          <ButtonSelectForm to="/chamado">
            <ScrollText className="h-5 w-5" />
            Chamado
          </ButtonSelectForm>
          <ButtonSelectForm to="/chamado">
            <BellRing className="h-5 w-5" />
            Reiteração
          </ButtonSelectForm>
          <ButtonSelectForm to="/chamado">
            <PhoneForwarded className="h-5 w-5" />
            Transferência
          </ButtonSelectForm>
          <ButtonSelectForm to="/chamado">
            <PhoneOff className="h-5 w-5" />
            Queda
          </ButtonSelectForm>
        </div>

        <section className="mt-10 flex justify-center">
          <Outlet />
        </section>
      </main>
    </SidebarProvider>
  );
}
