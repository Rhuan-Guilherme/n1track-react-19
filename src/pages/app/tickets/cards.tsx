import { Button } from "../../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../../components/ui/card";
import DescriptionCard from "./description-card";

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
        <DescriptionCard />
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
