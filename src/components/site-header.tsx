import { AlertCircle, SidebarIcon } from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import logo from "@/assets/logo.svg";
import { Alert, AlertDescription } from "./ui/alert";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();

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
        <div className="w-full sm:ml-auto sm:w-auto">
          <Alert variant="default">
            <AlertCircle />
            <AlertDescription>
              STF Digital com lentidão. Link: 223908
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </header>
  );
}
