import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export function SingUp() {
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

      <form className="w-full space-y-6">
        <div className="flex flex-col gap-3">
          <Label htmlFor="name">Seu nome</Label>
          <Input
            type="text"
            id="name"
            name="name"
            required
            className="h-10 border-zinc-300 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="email">E-mail</Label>
          <Input
            type="email"
            id="email"
            name="email"
            required
            className="h-10 border-zinc-300 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="password">Senha</Label>
          <Input
            type="password"
            id="password"
            name="password"
            required
            className="h-10 border-zinc-300 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900"
          />
        </div>
        <p className="text-destructive font-semibold dark:text-rose-500">
          E-mail ja cadastrado!
        </p>
        <Button className="cursor-pointer">Cadastrar</Button>
      </form>
    </div>
  );
}
