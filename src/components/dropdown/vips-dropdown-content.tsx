import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Combobox } from "../combobox";
import { useState } from "react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { alterVipStfuser } from "@/api/alter-vip-api";
import { toast } from "sonner";
import { removeVipStfuser } from "@/api/remove-vip-api";

interface User {
  id: string;
  login: string;
  name: string;
  area: string;
  cargo: string;
  vip: boolean;
}

export function VipsDropDownContent() {
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
    <DialogContent className="min-w-1/2">
      <DialogHeader>
        <DialogTitle>Cadastro de usuários VIPs</DialogTitle>
        <p className="text-accent-foreground/70 text-sm">
          Ao criar adicionar um usuário como VIP, todos so chamados desse
          usuário aparecerão como VIP na lista de chamados.
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
        <DialogDescription>
          {users && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Login</TableHead>
                  <TableHead>Área demandante</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead className="text-right">Deletar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">{users.name}</TableCell>
                  <TableCell>{users.login}</TableCell>
                  <TableCell>{users.area}</TableCell>
                  <TableCell>{users.cargo}</TableCell>
                  <TableCell className="text-right">
                    {users.vip === true ? (
                      <Button
                        onClick={() => handleRemoveVips(users.id)}
                        className="cursor-pointer"
                        variant="destructive"
                      >
                        Remover VIP
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleAlterVips(users.id)}
                        className="font-roboto cursor-pointer bg-amber-400 font-semibold text-amber-950 transition-all hover:bg-amber-500"
                      >
                        Adicionar VIP
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
