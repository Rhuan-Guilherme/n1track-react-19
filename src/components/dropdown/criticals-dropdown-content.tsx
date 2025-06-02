import { useMutation, useQuery } from "@tanstack/react-query";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { getCriticalApi } from "@/api/get-critical";
import { Alert, AlertDescription } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { createCriticalApi } from "@/api/create-critical";
import { toast } from "sonner";
import { deleteCriticalApi } from "@/api/delete-critical";
import { queryClient } from "@/lib/query-cleint";

interface createCriticalRequest {
  title: string;
  description: string;
  link: string;
}

export function CriticalsDropDownContent() {
  const { register, handleSubmit } = useForm<createCriticalRequest>();

  const { data: critical } = useQuery({
    queryKey: ["critical"],
    queryFn: getCriticalApi,
  });

  const { mutateAsync: createCriticalFn } = useMutation({
    mutationFn: createCriticalApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["critical"] });
    },
  });

  const { mutateAsync: deleteCriticalFn } = useMutation({
    mutationFn: deleteCriticalApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["critical"] });
    },
  });

  async function handleCreateCritical(body: createCriticalRequest) {
    try {
      await createCriticalFn(body);
      toast.success(
        "Chamado crítico atualizado. Avise os colegas para recarregarem a página.",
      );
    } catch (error) {
      console.log(error);
      toast.error("Erro ao adicionar criar chamado.");
    }
  }

  return (
    <DialogContent className="min-w-1/2">
      <DialogHeader>
        <DialogTitle>Cadastro de chamados criticos</DialogTitle>
        <p className="text-accent-foreground/70 text-sm">
          Observação: Só é possível criar um único alerta de chamado crítico por
          vez. Caso um novo chamado seja criado, ele substituirá o anterior.
        </p>
        <form
          onSubmit={handleSubmit(handleCreateCritical)}
          className="my-5 flex flex-col gap-2"
        >
          <div className="relative flex w-full flex-col gap-3 pt-4">
            <Label>Titulo: </Label>
            <Input
              {...register("title")}
              placeholder="Ex: STF Digital com lentidão"
            />
          </div>
          <div className="relative flex w-full flex-col gap-3 pt-4">
            <Label>Descrição: </Label>
            <Input
              {...register("description")}
              placeholder="Ex: informando que o sistema do STF Digital apresenta lentidão."
            />
          </div>
          <div className="relative flex w-full flex-col gap-3 pt-4">
            <Label>Número do chamado principal: </Label>
            <Input {...register("link")} placeholder="Ex: 223098" />
          </div>
          <div>
            <Button>Cadastrar</Button>
          </div>
        </form>
        <DialogDescription>
          {critical && (
            <>
              <p>Chamado cadastrado:</p>
              <div className="flex gap-3">
                <Alert className="border-rose-500">
                  <AlertCircleIcon />
                  <AlertDescription className="">
                    {critical.title}. Link: {critical.link}
                  </AlertDescription>
                </Alert>
                <Button
                  onClick={() => deleteCriticalFn(critical.id)}
                  variant="destructive"
                  className="cursor-pointer"
                >
                  Deletar
                </Button>
              </div>
            </>
          )}
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
