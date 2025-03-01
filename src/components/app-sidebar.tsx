import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavOptions } from "@/components/nav-options";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { NavSystem } from "./nav-system";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="top-[57px] !h-[calc(100svh-57px)]" {...props}>
      <SidebarContent>
        <NavMain />
        <NavSystem />
        <NavOptions />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
