import { BookOpenCheck, Cpu, Home, LayoutList, Star } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { VipsDropDownContent } from "./dropdown/vips-dropdown-content";

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Menu">
            <Link to="/">
              <Home />
              <span>Home</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Menu">
            <Link to="/">
              <LayoutList />
              <span>Listas de chamados</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Menu">
            <Link to="/">
              <BookOpenCheck />
              <span>Binds</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <Dialog>
            <DialogTrigger asChild>
              <SidebarMenuButton asChild tooltip="Menu">
                <button className="cursor-pointer">
                  <Star />
                  <span>Vips</span>
                </button>
              </SidebarMenuButton>
            </DialogTrigger>
            <VipsDropDownContent />
          </Dialog>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Menu">
            <Link to="/ia">
              <Cpu />
              <span>
                Formatação de e-mail{" "}
                <span className="font-robotoMono animate- animate-gradientMove text-accent dark:text-foreground h-screen w-full rounded-md bg-gradient-to-r from-[#0f172a] via-[#4f46e5] to-[#06b6d4] bg-[length:200%_200%] p-1">
                  IA
                </span>
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
