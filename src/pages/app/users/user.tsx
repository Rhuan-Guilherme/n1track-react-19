import { alterVipStfuser } from "@/api/alter-vip-api";
import { removeVipStfuser } from "@/api/remove-vip-api";
import { Combobox } from "@/components/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface User {
  id: string;
  login: string;
  name: string;
  area: string;
  cargo: string;
  vip: boolean;
}

export function User() {
  const [users, setUsers] = useState<User | null>();
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const { register, watch, setValue } = useForm();

  const loginWatched = watch("login");

  const handleSelectLogin = (user: User) => {
    setValue("login", user.login);
    setUsers(user);
  };

  const { mutateAsync: alterVipStfuserfn } = useMutation({
    mutationFn: alterVipStfuser,
  });

  const { mutateAsync: removeVipStfuserFn } = useMutation({
    mutationFn: removeVipStfuser,
  });

  function handleAlterVips(id: string) {
    try {
      alterVipStfuserfn(id);
      setUsers(null);
      toast.success("Usuário adicionado a lista de VIPs!");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao adicionar usuário a lista de VIPs.");
    }
  }

  function handleRemoveVips(id: string) {
    try {
      removeVipStfuserFn(id);
      toast.success("Usuário removido da lista de VIPs!");
      setUsers(null);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao remover usuário da lista de VIPs.");
    }
  }

  return (
    <div className="px-20">
      <p className="text-accent-foreground/70 text-sm">
        Ao criar adicionar um usuário como VIP, todos so chamados desse usuário
        aparecerão como VIP na lista de chamados.
      </p>
      <form className="my-5 flex flex-col gap-2">
        <Label>Selecione um usuário:</Label>
        <div className="relative flex w-full flex-col gap-3 pt-4">
          <Input
            {...register("login")}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            type="text"
          />
          {loginWatched && loginWatched.length > 2 && (
            <Combobox
              onSelect={handleSelectLogin}
              searchValue={loginWatched}
              isInputFocused={isInputFocused}
            />
          )}
        </div>
      </form>
    </div>
  );
}
