import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export function SingIn() {
  return (
    <div className="w-4/11 space-y-15">
      <div className="flex flex-col gap-2">
        <h1 className="text-7xl leading-15">
          Entre em <br /> sua conta.
        </h1>
        <p>
          Ainda não tem cadastro?{" "}
          <Link to="/sing-up" className="font-bold text-blue-500">
            Cadastre-se
          </Link>
        </p>
      </div>

      <form className="w-full space-y-6">
        <div className="flex flex-col gap-3">
          <Label htmlFor="email">E-mail:</Label>
          <Input
            type="email"
            id="email"
            name="email"
            required
            className="h-10 dark:border-zinc-600 dark:bg-zinc-900"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="email">Password</Label>
          <Input
            type="email"
            id="email"
            name="email"
            required
            className="h-10 dark:border-zinc-600 dark:bg-zinc-900"
          />
        </div>
        <p className="text-destructive dark:text-rose-500">
          Usuário ou senha inválidos!
        </p>
        <Button className="cursor-pointer">Entrar</Button>
      </form>
    </div>
  );
}
