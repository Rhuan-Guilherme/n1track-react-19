import * as React from "react";
import { LogOut, Moon } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavOptions } from "@/components/nav-options";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  projects: [
    {
      name: "Tema",
      url: "#",
      icon: Moon,
    },
    {
      name: "Sair",
      url: "#",
      icon: LogOut,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="top-[57px] !h-[calc(100svh-57px)]" {...props}>
      <SidebarContent>
        <NavMain />
        <NavOptions />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
