import { useMutation } from "@tanstack/react-query";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Switch } from "../ui/switch";
import { useState } from "react";
import { createStfUser } from "@/api/create-stf-user";

interface createStfUserRequest {
  name: string;
  login: string;
  area: string;
  cargo: string;
}

export function CreateStfUser() {
  const [vip, setVip] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<createStfUserRequest>();

  const { mutateAsync: createStfUserFn } = useMutation({
    mutationFn: createStfUser,
  });

  async function handleCreateCritical(body: createStfUserRequest) {
    try {
      await createStfUserFn({
        area: body.area,
        cargo: body.cargo,
        login: body.login,
        name: body.name,
        vip,
      });

      toast.success("Usuário adicionado com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("O usuário informado já está cadastrado! Tente novamente.");
    }
  }

  return (
    <DialogContent className="min-w-1/2">
      <DialogHeader>
        <DialogTitle>Cadastro de usuários</DialogTitle>
        <p className="text-accent-foreground/70 text-sm">
          Crie novos usuários que ainda não tem cadastro no sistema.
        </p>
        <form
          onSubmit={handleSubmit(handleCreateCritical)}
          className="my-5 flex flex-col gap-2"
        >
          <div className="relative flex w-full gap-3 pt-4">
            <div className="w-full">
              <Label>Nome: </Label>
              <Input {...register("name")} />
            </div>
            <div className="w-full">
              <Label>Login: </Label>
              <Input {...register("login")} />
            </div>
          </div>
          <div className="relative flex w-full gap-3 pt-4">
            <div className="w-full">
              <Label>Área demandate: </Label>
              <Input {...register("area")} />
            </div>
            <div className="w-full">
              <Label>Cargo: </Label>
              <Input {...register("cargo")} />
            </div>
          </div>
          <div className="w-full">
            <Label>VIP: </Label>
            <Switch onCheckedChange={() => setVip(!vip)} />
          </div>
          <div>
            <Button>Cadastrar</Button>
          </div>
        </form>
      </DialogHeader>
    </DialogContent>
  );
}
