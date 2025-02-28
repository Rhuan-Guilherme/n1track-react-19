import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";

export default function CardsComponent() {
  return (
    <Card className="max-w-72 min-w-72">
      <CardHeader>
        <CardDescription>28/02/2025 às 17h</CardDescription>
        <CardTitle>Rhuan - 3416</CardTitle>
        <CardDescription>
          Secretária de técnologia da informação
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-border mb-3 h-0.5 w-full"></div>
        <div className="flex flex-col gap-2 text-sm leading-6">
          <p>
            Prezados, Sr(a). Rhuan entrou em contato informando que sua máquina
            não está ligando e solicita um técnico no local para verificar o
            problema.
          </p>
          <p>Nome: Rhuan Guilherme de sousa Silva</p>
          <p>Login: rhuan.g.silva</p>
          <p>Ramal: 3685</p>
          <p>Local: Anexo 2A / 2° andar / Sala 255</p>
          <p>Patrimônio: ETU103416</p>
        </div>
        <div className="bg-border mt-3 h-0.5 w-full"></div>
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-2">
        <Button className="flex-1 cursor-pointer" variant="secondary">
          editar
        </Button>
        <Button className="flex-1 cursor-pointer" variant="secondary">
          copiar
        </Button>
        <Button className="flex-1 cursor-pointer" variant="secondary">
          concluir
        </Button>
      </CardFooter>
    </Card>
  );
}
