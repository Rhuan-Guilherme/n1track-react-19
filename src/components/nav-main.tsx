import { Cpu, Home, LayoutList } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

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
