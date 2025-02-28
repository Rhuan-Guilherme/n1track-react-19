import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AlertCircle, BookOpenCheck, Moon, Star, Sun } from "lucide-react";

import { useTheme } from "./theme/theme-provider";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { VipsDropDownContent } from "./dropdown/vips-dropdown-content";
import { BindsDropDownContent } from "./dropdown/binds-dropdown-content";

export function NavOptions() {
  const { setTheme, theme } = useTheme();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Sistema</SidebarGroupLabel>
      <SidebarMenu>
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
          <Dialog>
            <DialogTrigger asChild>
              <SidebarMenuButton asChild tooltip="Menu">
                <button>
                  <BookOpenCheck />
                  <span>Binds</span>
                </button>
              </SidebarMenuButton>
            </DialogTrigger>
            <BindsDropDownContent />
          </Dialog>
        </SidebarMenuItem>
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
