import { singUpApi } from "@/api/sing-up-api";
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

const singUpSchema = z.object({
  name: z.string(),
  email: z.string().email("O e-mail informado está inválido!"),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres."),
});

type singUpTypes = z.infer<typeof singUpSchema>;

export function SingUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isLoading, errors },
  } = useForm<singUpTypes>({
    resolver: zodResolver(singUpSchema),
  });

  const { mutateAsync: singUpApiFn } = useMutation({
    mutationFn: singUpApi,
  });

  async function handleSingUp(data: singUpTypes) {
    try {
      await singUpApiFn(data);
      toast.success("Conta criada com sucesso!");
      setTimeout(() => {
        navigate("/sing-in");
      }, 2000);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error);
      }
      console.log(error);
    }
  }

  return (
    <div className="animate-slideIn font-roboto bg-muted space-y-15 rounded-2xl p-10 lg:rounded-none lg:border-none lg:bg-transparent">
      <div className="flex flex-col gap-2">
        <h1 className="font-poppins text-4xl lg:text-6xl lg:leading-15">
          Crie <br /> sua conta.
        </h1>
        <p>
          Ja tem cadastro?{" "}
          <Link to="/sing-in" className="font-bold text-blue-500">
            Acesse sua conta
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit(handleSingUp)} className="w-full space-y-6">
        <div className="flex flex-col gap-3">
          <Label htmlFor="name">Seu nome</Label>
          <Input
            {...register("name")}
            type="text"
            id="name"
            className="h-10 border-zinc-300 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900"
          />
        </div>
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
            {errors.name?.message}
            {errors.password?.message}
          </p>
        )}

        <Button disabled={isLoading} className="cursor-pointer">
          Cadastrar
        </Button>
      </form>
    </div>
  );
}
