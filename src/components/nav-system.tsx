import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  AlertCircle,
  BookOpenCheck,
  ShieldEllipsis,
  User2,
} from "lucide-react";

import { Dialog, DialogTrigger } from "./ui/dialog";
import { BindsDropDownContent } from "./dropdown/binds-dropdown-content";
import { CriticalsDropDownContent } from "./dropdown/criticals-dropdown-content";
import { Link } from "react-router-dom";
import { getUserApi } from "@/api/get-user";
import { useQuery } from "@tanstack/react-query";

export function NavSystem() {
  const { data: profile } = useQuery({
    queryKey: ["user"],
    queryFn: getUserApi,
    staleTime: Infinity,
  });

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

        {profile && profile.user.role === "ADMIN" ? (
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Menu">
              <Link to="/management">
                <ShieldEllipsis />
                <span>Gerenciamento Admin</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ) : null}

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
