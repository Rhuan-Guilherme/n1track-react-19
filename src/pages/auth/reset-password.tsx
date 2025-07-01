import { forgotPasswordApi } from "@/api/forgot-password";
import { resetPasswordApi } from "@/api/reset-password";
import { singInApi } from "@/api/sing-in-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const singInSchema = z.object({
  code: z.string(),
  password: z.string(),
});

type singInTypes = z.infer<typeof singInSchema>;

export function ResetPassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isLoading },
  } = useForm<singInTypes>({
    resolver: zodResolver(singInSchema),
  });

  const { mutateAsync: resetPasswordApiFn } = useMutation({
    mutationFn: resetPasswordApi,
  });

  async function handleSingIn(data: singInTypes) {
    try {
      const email = localStorage.getItem("@n1track/reset-email");
      const response = await resetPasswordApiFn({
        code: data.code,
        newPassword: data.password,
        email,
      });
      toast(response.message);
      setTimeout(() => {
        toast("Faça login para continuar.");
      }, 1000);
      setTimeout(() => {
        navigate("/sing-in");
      }, 2000);
    } catch (error) {
      if (error instanceof AxiosError && error.code !== "ERR_NETWORK") {
        toast(error.response?.data.error);
      } else {
        toast(
          "Desculpe, estamos com problemas na comunicação com o servidor, tente novamente mais tarde. ",
        );
      }
    }
  }

  return (
    <div className="animate-slideIn font-roboto bg-muted space-y-15 rounded-2xl p-10 lg:rounded-none lg:border-none lg:bg-transparent">
      <title>Login</title>
      <div className="flex flex-col gap-2">
        <h1 className="font-poppins text-4xl lg:text-6xl lg:leading-15">
          Redefinição <br /> de senha.
        </h1>
        <p className="text-zinc-400">
          Verifique seu e-mail, foi encaminhado um código de 6 dígitos.
          <br />
        </p>
      </div>

      <form onSubmit={handleSubmit(handleSingIn)} className="w-full space-y-6">
        <div className="flex flex-col gap-3">
          <Label htmlFor="code">Código de 6 dígitos</Label>
          <Input
            {...register("code")}
            type="text"
            id="code"
            className="h-10 border-zinc-300 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="text">Nova Senha</Label>
          <Input
            {...register("password")}
            type="password"
            id="text"
            className="h-10 border-zinc-300 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900"
          />
        </div>
        <Button disabled={isLoading} type="submit" className="cursor-pointer">
          Alterar senha
        </Button>
      </form>
    </div>
  );
}
