import { singInApi } from "@/api/sing-in-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const singInSchema = z.object({
  email: z.string().email("O e-mail informado está inválido!"),
  password: z.string(),
});

type singInTypes = z.infer<typeof singInSchema>;

export function SingIn() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isLoading, errors },
  } = useForm<singInTypes>({
    resolver: zodResolver(singInSchema),
  });

  const { mutateAsync: singInApiFn } = useMutation({
    mutationFn: singInApi,
  });

  async function handleSingIn(data: singInTypes) {
    try {
      const { token } = await singInApiFn(data);
      localStorage.setItem("@n1track/token", token);
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast(error.response?.data.error);
      }
      console.log(error);
    }
  }

  return (
    <div className="animate-slideIn font-roboto bg-muted space-y-15 rounded-2xl p-10 lg:rounded-none lg:border-none lg:bg-transparent">
      <div className="flex flex-col gap-2">
        <h1 className="font-poppins text-4xl lg:text-6xl lg:leading-15">
          Entre em <br /> sua conta.
        </h1>
        <p>
          Ainda não tem cadastro?{" "}
          <Link to="/sing-up" className="font-bold text-blue-500">
            Cadastre-se
          </Link>
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
        <div className="flex flex-col gap-3">
          <Label htmlFor="password">Senha</Label>
          <Input
            {...register("password")}
            type="password"
            id="password"
            className="h-10 border-zinc-300 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900"
          />
        </div>
        {errors && (
          <p className="animate-slideIn text-destructive font-semibold dark:text-rose-500">
            {errors.email?.message}
          </p>
        )}

        <Button disabled={isLoading} type="submit" className="cursor-pointer">
          Entrar
        </Button>
      </form>
    </div>
  );
}
