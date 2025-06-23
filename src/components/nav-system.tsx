import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AlertCircle, BookOpenCheck, User2 } from "lucide-react";

import { Dialog, DialogTrigger } from "./ui/dialog";
import { BindsDropDownContent } from "./dropdown/binds-dropdown-content";
import { CriticalsDropDownContent } from "./dropdown/criticals-dropdown-content";
import { Link } from "react-router-dom";

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
                  <BookOpenCheck />
                  <span>Binds</span>
                </button>
              </SidebarMenuButton>
            </DialogTrigger>
            <BindsDropDownContent />
          </Dialog>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Dialog>
            <DialogTrigger asChild>
              <SidebarMenuButton asChild tooltip="Menu">
                <button className="cursor-pointer">
                  <AlertCircle />
                  <span>Chamados criticos</span>
                </button>
              </SidebarMenuButton>
            </DialogTrigger>
            <CriticalsDropDownContent />
          </Dialog>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Menu">
            <Link to="/users">
              <User2 />
              <span>Controle de usuários</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
