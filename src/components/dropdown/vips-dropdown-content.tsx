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

export function VipsDropDownContent() {
  return (
    <DialogContent className="min-w-1/2">
      <DialogHeader>
        <DialogTitle>Cadastro de usuários VIPs</DialogTitle>
        <p className="text-accent-foreground/70 text-sm">
          Ao criar adicionar um usuário como VIP, todos so chamados desse
          usuário aparecerão como VIP na lista de chamados.
        </p>
        <DialogDescription>
          <form className="my-5 flex gap-5">
            <Input type="text" />
            <Button>Adicionar</Button>
          </form>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Login</TableHead>
                <TableHead>Área demandante</TableHead>
                <TableHead className="text-right">Deletar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  Rhuan Guilherme de Sousa Silva
                </TableCell>
                <TableCell>rhuan.g.silva</TableCell>
                <TableCell>Suporte no sistema de TI</TableCell>
                <TableCell className="text-right">
                  <Button variant="destructive">Deletar</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Rhuan Guilherme de Sousa Silva
                </TableCell>
                <TableCell>rhuan.g.silva</TableCell>
                <TableCell>Suporte no sistema de TI</TableCell>
                <TableCell className="text-right">
                  <Button variant="destructive">Deletar</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Rhuan Guilherme de Sousa Silva
                </TableCell>
                <TableCell>rhuan.g.silva</TableCell>
                <TableCell>Suporte no sistema de TI</TableCell>
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
