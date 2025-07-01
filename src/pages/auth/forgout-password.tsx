import { forgotPasswordApi } from "@/api/forgot-password";
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
  email: z.string().email("O e-mail informado está inválido!"),
});

type singInTypes = z.infer<typeof singInSchema>;

export function ForgotPassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isLoading, errors },
  } = useForm<singInTypes>({
    resolver: zodResolver(singInSchema),
  });

  const { mutateAsync: forgotPasswordApiFn } = useMutation({
    mutationFn: forgotPasswordApi,
  });

  async function handleSingIn(data: singInTypes) {
    try {
      const response = await forgotPasswordApiFn(data);
      toast(response.message);
      const emailText = getValues("email");
      console.log(emailText);

      localStorage.setItem("@n1track/reset-email", emailText);
      setTimeout(() => {
        navigate("/reset");
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
          Recuperação <br /> de senha.
        </h1>
        <p className="text-zinc-400">
          Informe seu e-mail para que possamos enviar
          <br /> o código de recuperação de senha.
        </p>
      </div>

      <form onSubmit={handleSubmit(handleSingIn)} className="w-full space-y-6">
        <div className="flex flex-col gap-3">
          <Label htmlFor="email">E-mail</Label>
          <Input
            {...register("email")}
            type="email"
            id="email"
            className="h-10 border-zinc-300 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900"
          />
        </div>
        {errors && (
          <p className="animate-slideIn text-destructive font-semibold dark:text-rose-500">
            {errors.email?.message}
          </p>
        )}
        <Button disabled={isLoading} type="submit" className="cursor-pointer">
          Enviar código
        </Button>
      </form>
    </div>
  );
}
