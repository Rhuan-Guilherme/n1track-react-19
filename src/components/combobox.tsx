import { findStfUsers } from "@/api/find-stfusers";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

interface User {
  id: string;
  name: string;
  login: string;
  cargo: string;
  area: string;
  vip: boolean;
}

interface ComboboxProps {
  onSelect: (user: User) => void;
  searchValue: string;
  isInputFocused: boolean;
}

export function Combobox({
  onSelect,
  isInputFocused,
  searchValue,
}: ComboboxProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [debouncedSearch, setDebouncedSearch] = useState<string>(searchValue);
  const comboboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        comboboxRef.current &&
        !comboboxRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside, false);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside, false);
  }, []);

  useEffect(() => {
    if (isInputFocused) {
      setOpen(true);
    }
  }, [isInputFocused]);

  useEffect(() => {
    setUsers([]);
    const handler = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchValue]);

  const { data: stfusers, isLoading } = useQuery({
    queryKey: ["users", debouncedSearch],
    queryFn: () => findStfUsers(debouncedSearch),
    enabled: !!debouncedSearch.trim(),
    networkMode: "always",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: false,
    gcTime: 0,
  });

  useEffect(() => {
    if (stfusers) {
      setUsers(stfusers.users);
    }
  }, [stfusers]);

  const handleSelect = (user: User) => {
    onSelect(user);
    setOpen(false);
  };

  return (
    <>
      {open && (isLoading || users.length > 0) && (
        <div
          ref={comboboxRef}
          className="border-border bg-popover text-popover-foreground absolute top-17 z-50 max-h-60 w-full overflow-hidden overflow-y-auto rounded-md border p-1 shadow-md"
        >
          {isLoading ? (
            <p className="text-muted-foreground p-2 text-center text-sm">
              Carregando...
            </p>
          ) : users.length > 0 ? (
            users.map((user) => (
              <button
                key={user.id}
                className="hover:bg-accent hover:text-accent-foreground focus:bg-accent relative flex w-full cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none"
                onClick={() => handleSelect(user)}
              >
                {user.login}
              </button>
            ))
          ) : (
            <p className="text-muted-foreground p-2 text-center text-sm">
              nenhum resultado encontrado.
            </p>
          )}
        </div>
      )}
    </>
  );
}
