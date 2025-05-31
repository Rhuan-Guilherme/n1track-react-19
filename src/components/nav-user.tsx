import { BadgeCheck, ChevronsUpDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { getUserApi } from "@/api/get-user";
import { Skeleton } from "./ui/skeleton";
import { useNavigate } from "react-router-dom";
import { useErrorNetworkApi } from "@/hooks/error-network-api";

export function NavUser() {
  const { isMobile } = useSidebar();
  const navigate = useNavigate();

  const {
    data: profile,
    error,
    failureCount,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserApi,
    staleTime: Infinity,
  });

  useErrorNetworkApi({ error, failureCount, isError });

  function logout() {
    localStorage.removeItem("@n1track/token");
    navigate("/sing-in", { replace: true });
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {profile ? (
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src="" alt={profile.user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
              ) : (
                <Skeleton className="h-8 w-8" />
              )}

              <div className="grid flex-1 text-left text-sm leading-tight">
                {profile ? (
                  <>
                    <span className="truncate font-medium">
                      {profile.user.name}
                    </span>
                    <span className="truncate text-xs">
                      {profile.user.email}
                    </span>
                  </>
                ) : (
                  <>
                    <Skeleton className="mb-1 h-3 w-15" />
                    <Skeleton className="h-3 w-25" />
                  </>
                )}
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {profile && <AvatarImage src="" alt={profile.user.name} />}
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  {profile && (
                    <>
                      <span className="truncate font-medium">
                        {profile.user.name}
                      </span>
                      <span className="truncate text-xs">
                        {profile.user.email}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <BadgeCheck />
              Account
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
