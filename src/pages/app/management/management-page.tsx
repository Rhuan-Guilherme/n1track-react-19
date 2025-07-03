import { getAllUsersManagementApi } from "@/api/get-all-users-management";
import { toogleUserStatus } from "@/api/toogle-user-status";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { deleteUser } from "@/api/delete-user";
import { toast } from "sonner";

export function ManagementPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: getAllUsersManagementApi,
    staleTime: Infinity,
  });

  const { mutateAsync: toogleUserStatusFn } = useMutation({
    mutationFn: ({ userId, isActive }: { userId: string; isActive: boolean }) =>
      toogleUserStatus(userId, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
      toast.success("Alteração realizada com sucesso.");
    },
  });

  const { mutateAsync: deleteUserFn } = useMutation({
    mutationFn: (userId: string) => deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
      setSelectedUserId(null);
      toast.success("Usuário deletado com sucesso!");
    },
  });

  if (isLoading) return <div className="p-6">Carregando usuários...</div>;
  if (error || !profile?.users)
    return <div className="p-6 text-red-500">Erro ao carregar usuários.</div>;

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Usuários cadastrados</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {profile.users.map((user) => (
          <Card
            key={user.id}
            className="flex flex-col justify-between transition-shadow hover:shadow-lg"
          >
            <div>
              <CardHeader>
                <CardTitle className="text-lg">{user.name}</CardTitle>
                <p className="text-muted-foreground text-sm">{user.email}</p>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Função:</span>
                  <span className="capitalize">{user.role}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Criado em:</span>
                  <span>{new Date(user.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant={user.is_active ? "default" : "destructive"}>
                    {user.is_active ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
              </CardContent>
            </div>

            {/* Ações */}
            <CardContent className="flex justify-start gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() =>
                  toogleUserStatusFn({
                    userId: user.id,
                    isActive: !user.is_active,
                  })
                }
              >
                {user.is_active ? "Desativar" : "Ativar"}
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="destructive"
                    onClick={() => setSelectedUserId(user.id)}
                  >
                    Excluir
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Tem certeza que deseja excluir este usuário?
                    </DialogTitle>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="ghost"
                      onClick={() => setSelectedUserId(null)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        deleteUserFn(user.id);
                      }}
                    >
                      Confirmar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
