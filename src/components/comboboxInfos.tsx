import { getBindsApi } from "@/api/get-binds";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

interface Binds {
  id: string;
  title: string;
  description: string;
}

interface ComboboxProps {
  onSelect: (bind: Binds) => void;
  searchValue: string;
  isInputFocused: boolean;
}

export function ComboboxInfos({
  onSelect,
  isInputFocused,
  searchValue,
}: ComboboxProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [bind, setBinds] = useState<Binds[]>([]);
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
    setBinds([]);
    const handler = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchValue]);

  const { data: binds, isLoading } = useQuery({
    queryKey: ["binds", debouncedSearch],
    queryFn: () => getBindsApi(debouncedSearch),
    enabled: !!debouncedSearch.trim(),
    networkMode: "always",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: false,
    gcTime: 0,
  });

  useEffect(() => {
    if (binds) {
      setBinds(binds.binds);
    }
  }, [binds]);

  const handleSelect = (bind: Binds) => {
    onSelect(bind);
    setOpen(false);
  };

  return (
    <>
      {open && (isLoading || bind.length > 0) && (
        <div
          ref={comboboxRef}
          className="border-border bg-popover text-popover-foreground absolute top-17 z-50 max-h-60 w-full overflow-hidden overflow-y-auto rounded-md border p-1 shadow-md"
        >
          {isLoading ? (
            <p className="text-muted-foreground p-2 text-center text-sm">
              Carregando...
            </p>
          ) : bind.length > 0 ? (
            bind.map((bind) => (
              <button
                key={bind.id}
                className="hover:bg-accent hover:text-accent-foreground focus:bg-accent relative flex w-full cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none"
                onClick={() => handleSelect(bind)}
              >
                {bind.title}
              </button>
            ))
          ) : null}
        </div>
      )}
    </>
  );
}
