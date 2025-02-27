import * as React from "react";
import {
  BookOpen,
  ListCheck,
  LogOut,
  Star,
  HomeIcon,
  Moon,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
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
  navMain: [
    {
      title: "Home",
      url: "#",
      icon: HomeIcon,
      isActive: true,
    },
    {
      title: "Lista de chamados",
      url: "#",
      icon: ListCheck,
    },
    {
      title: "Binds",
      url: "#",
      icon: BookOpen,
    },
    {
      title: "Vips",
      url: "#",
      icon: Star,
    },
  ],
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
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
