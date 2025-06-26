import { alterVipStfuser } from "@/api/alter-vip-api";
import { removeVipStfuser } from "@/api/remove-vip-api";
import { Combobox } from "@/components/combobox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateStfuser } from "@/api/update-stf-user";
import { queryClient } from "@/lib/query-cleint";

interface User {
  id: string;
  login: string;
  name: string;
  area: string;
  cargo: string;
  vip: boolean;
}

export function User() {
  const [users, setUsers] = useState<User | null>(null);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const { register, watch, setValue, handleSubmit } = useForm<User>();

  const loginWatched = watch("login");

  const handleSelectLogin = (user: User) => {
    setValue("login", user.login);
    setValue("name", user.name);
    setValue("area", user.area);
    setValue("cargo", user.cargo);
    setUsers(user);
  };

  const { mutateAsync: alterVipStfuserfn, isPending: isAltering } = useMutation(
    {
      mutationFn: alterVipStfuser,
      async onSuccess() {
        await queryClient.invalidateQueries({
          queryKey: ["users", users?.login],
        });
      },
    },
  );

  const { mutateAsync: removeVipStfuserFn, isPending: isRemoving } =
    useMutation({
      mutationFn: removeVipStfuser,

      async onSuccess() {
        await queryClient.invalidateQueries({
          queryKey: ["users", users?.login],
        });
      },
    });

  const { mutateAsync: updateStfuserFn } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateStfuser(id, data),

    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["users", users?.login],
      });
    },
  });

  async function handleAlterVips(id: string) {
    try {
      await alterVipStfuserfn(id);
      setUsers(null);
      toast.success("Usuário adicionado à lista de VIPs!");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao adicionar usuário à lista de VIPs.");
    }
  }

  async function handleRemoveVips(id: string) {
    try {
      await removeVipStfuserFn(id);
      setUsers(null);
      toast.success("Usuário removido da lista de VIPs!");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao remover usuário da lista de VIPs.");
    }
  }

  async function handleUpdateUser(data: User) {
    try {
      await updateStfuserFn({ id: users?.id as string, data });
      setUsers(null);
      toast.success("Usuário atualizado com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Erro para atualizar usuário");
    }
  }

  return (
    <div className="px-4 py-8">
      <title>N1Track | Controle de usuários</title>
      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle>Gerenciamento de Usuários</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 text-sm">
            Busque e edite usuários do sistema
          </p>
          <form className="flex flex-col gap-2">
            <div className="relative flex w-full flex-col gap-3">
              <Label>Selecione um usuário:</Label>
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

          {users && (
            <div className="mt-6 grid grid-cols-1 gap-4">
              <Card className="bg-muted p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-semibold">{users.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      <span className="font-medium">Login:</span> {users.login}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      <span className="font-medium">Área:</span> {users.area}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      <span className="font-medium">Cargo:</span> {users.cargo}
                    </p>
                    {users.vip && (
                      <Badge
                        variant="outline"
                        className="mt-1 w-fit border-amber-500 text-amber-500"
                      >
                        VIP
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 md:flex-row">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="cursor-pointer">
                          Editar
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Editar Usuário</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit(handleUpdateUser)}>
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                              <Label>Nome</Label>
                              <Input
                                defaultValue={users.name}
                                {...register("name")}
                              />
                            </div>
                            <div>
                              <Label>Login</Label>
                              <Input
                                defaultValue={users.login}
                                {...register("login")}
                              />
                            </div>
                            <div className="md:col-span-2">
                              <Label>Área</Label>
                              <Input
                                defaultValue={users.area}
                                {...register("area")}
                              />
                            </div>
                            <div className="md:col-span-2">
                              <Label>Cargo</Label>
                              <Input
                                defaultValue={users.cargo}
                                {...register("cargo")}
                              />
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Button variant="secondary">
                              Salvar alterações (não implementado)
                            </Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                    {users.vip ? (
                      <Button
                        onClick={() => handleRemoveVips(users.id)}
                        variant="destructive"
                        disabled={isRemoving}
                        className="cursor-pointer"
                      >
                        Remover VIP
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleAlterVips(users.id)}
                        className="cursor-pointer bg-amber-400 text-amber-950 hover:bg-amber-500"
                        disabled={isAltering}
                      >
                        Adicionar VIP
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
