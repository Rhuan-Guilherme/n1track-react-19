import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Moon } from "lucide-react";

export function NavOptions() {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Option</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton className="cursor-pointer">
            <Moon />
            <span>Tema</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
