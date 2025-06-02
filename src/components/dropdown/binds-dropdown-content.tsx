import { getBindsApi } from "@/api/get-binds";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-cleint";
import { deleteBindApi } from "@/api/delete-bind";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { createBindsApi } from "@/api/create-binds";
import { toast } from "sonner";

interface createBindsRequest {
  title: string;
  description: string;
}

export function BindsDropDownContent() {
  const { register, handleSubmit } = useForm<createBindsRequest>();

  const { data: binds } = useQuery({
    queryKey: ["binds"],
    queryFn: getBindsApi,
  });

  const { mutateAsync: createBindslFn } = useMutation({
    mutationFn: createBindsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["binds"] });
    },
  });

  const { mutateAsync: deleteBindlFn } = useMutation({
    mutationFn: deleteBindApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["binds"] });
    },
  });

  async function handleCreateCritical(body: createBindsRequest) {
    try {
      await createBindslFn(body);
      toast.success("Bind criada com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao adicionar criar chamado.");
    }
  }
  return (
    <DialogContent className="min-w-1/2">
      <DialogHeader>
        <DialogTitle>Cadastro de binds</DialogTitle>
        <p className="text-accent-foreground/70 text-sm">
          Ao criar uma bind, pode utilizá-la no formulário de informação
          utilizando \nome-da-bind
        </p>
        <form
          onSubmit={handleSubmit(handleCreateCritical)}
          className="my-5 flex gap-5"
        >
          <div className="w-1/3">
            <Label>Título</Label>
            <Input
              {...register("title")}
              placeholder="Ex: Máquina sem rede"
              type="text"
            />
          </div>
          <div className="w-full">
            <Label>Informação</Label>
            <Input
              {...register("description")}
              placeholder="Ex: informando que sua máquina está sem rede."
              type="text"
            />
          </div>
          <div className="mt-5.5">
            <Button>Adicionar</Button>
          </div>
        </form>
        <DialogDescription>
          <div
            className="max-h-90 overflow-y-auto rounded-md border"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#71717a #000000", // thumb cinza, track preta
            }}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome da bind</TableHead>
                  <TableHead>Informação</TableHead>
                  <TableHead className="text-right">Deletar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {binds &&
                  binds.binds.map((bind) => (
                    <TableRow key={bind.id}>
                      <TableCell className="font-medium">
                        {bind.title}
                      </TableCell>
                      <TableCell>{bind.description}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          onClick={() => deleteBindlFn(bind.id)}
                          variant="destructive"
                        >
                          Deletar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
