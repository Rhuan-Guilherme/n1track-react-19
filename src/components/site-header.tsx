import { SidebarIcon } from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import logo from "@/assets/logo.svg";
import { getPerformaceByUser } from "@/api/get-preformace";
import { useQuery } from "@tanstack/react-query";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();

  const { data: performace } = useQuery({
    queryKey: ["performace"],
    queryFn: getPerformaceByUser,
  });

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb className="hidden sm:flex sm:items-center sm:justify-center sm:gap-4">
          <img
            src={logo}
            alt="Logo n1trakc - headset azul"
            className="h-8 animate-pulse"
          />
          <p className="font-robotoMono text-xl font-semibold">N1Track</p>
        </Breadcrumb>
        <div className="sm:ml-auto sm:w-auto">
          <Tooltip>
            <TooltipTrigger>
              <div className="font-poppins rounded-lg border-1 border-zinc-600 p-2 text-sm">
                Abertos hoje:{" "}
                <span className="ml-2 rounded-full border-1 px-1 dark:border-indigo-500 dark:bg-indigo-950">
                  {performace?.total}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent className="flex flex-col gap-2">
              <span>Chamados: {performace?.chamado}</span>
              <span>Reiteração: {performace?.reiteracao}</span>
              <span>Transferência: {performace?.transferencia}</span>
              <span>Queda: {performace?.queda}</span>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}
