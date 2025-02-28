import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AlertCircle, Moon, Sun } from "lucide-react";

import { useTheme } from "./theme/theme-provider";

export function NavOptions() {
  const { setTheme, theme } = useTheme();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Sistema</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={() => {
              if (theme === "light") {
                setTheme("dark");
              } else {
                setTheme("light");
              }
            }}
            className="cursor-pointer"
          >
            {theme === "light" ? <Moon /> : <Sun />}
            Tema {theme === "light" ? "escuro" : "claro"}
          </SidebarMenuButton>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <AlertCircle />
              Chamados criticos
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
