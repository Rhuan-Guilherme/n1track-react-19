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

export function BindsDropDownContent() {
  return (
    <DialogContent className="min-w-1/2">
      <DialogHeader>
        <DialogTitle>Cadastro de binds</DialogTitle>
        <p className="text-accent-foreground/70 text-sm">
          Ao criar uma bind, pode utiliza-la no formulário de informação
          utilizando \nome-da-bind
        </p>
        <DialogDescription>
          <form className="my-5 flex gap-5">
            <Input type="text" />
            <Button>Adicionar</Button>
          </form>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome da bind</TableHead>
                <TableHead>Informação</TableHead>
                <TableHead className="text-right">Deletar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Impressora erro</TableCell>
                <TableCell>
                  informando que está com problemas para utilizar a impressora.
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="destructive">Deletar</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
