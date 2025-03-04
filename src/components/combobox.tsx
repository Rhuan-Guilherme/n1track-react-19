// import { useRef, useState } from "react"

import { useEffect, useRef, useState } from "react";

interface User {
  id: number;
  name: string;
  login: string;
  cargo: string;
  area: string;
}

const usersMoc = [
  {
    id: 1,
    name: "Rhuan",
    login: "rhuan.g.silva",
    cargo: "Analista",
    area: "Sexcretaria de comunicação social",
  },
  {
    id: 2,
    name: "Felipe",
    login: "felipe.v.souza",
    cargo: "Desenvolvedor",
    area: "TI",
  },
  {
    id: 3,
    name: "Lucas",
    login: "lucas.g.alves",
    cargo: "Analista",
    area: "TI",
  },
  {
    id: 4,
    name: "João",
    login: "joao.v.alves",
    cargo: "Desenvolvedor",
    area: "TI",
  },
  { id: 5, name: "Ana", login: "ana.v.souza", cargo: "Gerente", area: "TI" },
];

interface ComboboxProps {
  onSelect: (user: User) => void;
  searchValue: string;
  // inputRef: React.RefObject<HTMLInputElement>
  isInputFocused: boolean;
}

export function Combobox({
  onSelect,
  isInputFocused,
  searchValue,
}: ComboboxProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const comboboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutSide(event: MouseEvent) {
      if (
        comboboxRef.current &&
        !comboboxRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutSide, false);
    return () =>
      document.removeEventListener("mousedown", handleClickOutSide, false);
  });

  useEffect(() => {
    if (isInputFocused) {
      setOpen(true);
    }
  }, [isInputFocused]);

  useEffect(() => {
    const filteredUsers = usersMoc.filter(
      (user) =>
        user.login.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.name.toLowerCase().includes(searchValue.toLowerCase()),
    );

    setUsers(filteredUsers);
  }, [searchValue]);

  const handleSelect = (user: User) => {
    onSelect(user);
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div
          ref={comboboxRef}
          className="border-border bg-popover text-popover-foreground absolute top-17 z-50 max-h-60 w-full overflow-y-auto rounded-md border p-1 shadow-md"
        >
          {users &&
            users.map((user) => {
              return (
                <button
                  key={user.id}
                  className="hover:bg-accent hover:text-accent-foreground focus:bg-accent relative flex w-full cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none"
                  onClick={() => handleSelect(user)}
                >
                  {user.login}
                </button>
              );
            })}
        </div>
      )}
    </>
  );
}
