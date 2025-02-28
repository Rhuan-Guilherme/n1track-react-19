import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AlertCircle, BookOpenCheck, Star } from "lucide-react";

import { Dialog, DialogTrigger } from "./ui/dialog";
import { VipsDropDownContent } from "./dropdown/vips-dropdown-content";
import { BindsDropDownContent } from "./dropdown/binds-dropdown-content";

export function NavSystem() {
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
                <button className="cursor-pointer">
                  <BookOpenCheck />
                  <span>Binds</span>
                </button>
              </SidebarMenuButton>
            </DialogTrigger>
            <BindsDropDownContent />
          </Dialog>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <AlertCircle />
            Chamados criticos
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
