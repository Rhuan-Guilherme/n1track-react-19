import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Home() {
  return (
    <form className="dark:bg-accent border-accent-foreground/10 flex w-1/2 flex-col items-center justify-center gap-5 rounded-md border p-5">
      <div className="flex w-full gap-3">
        <div className="flex w-full flex-col gap-3">
          <Label>Nome</Label>
          <Input
            type="text"
            name="name"
            className="border-accent-foreground/15 bg-zinc-100 dark:bg-zinc-950"
          />
        </div>
        <div className="flex w-full flex-col gap-3">
          <Label>Login</Label>
          <Input
            type="text"
            name="name"
            className="border-accent-foreground/15 bg-zinc-100 dark:bg-zinc-950"
          />
        </div>
      </div>
      <div className="flex w-full gap-3">
        <div className="flex w-full flex-col gap-3">
          <Label>Ramal</Label>
          <Input
            type="text"
            name="name"
            className="border-accent-foreground/15 bg-zinc-100 dark:bg-zinc-950"
          />
        </div>
        <div className="flex w-full flex-col gap-3">
          <Label>Patrimônio</Label>
          <Input
            type="text"
            name="name"
            className="border-accent-foreground/15 bg-zinc-100 dark:bg-zinc-950"
          />
        </div>
      </div>

      <div className="w-full">
        <Label>Informação</Label>
        <Input
          type="text"
          name="name"
          className="border-accent-foreground/15 bg-zinc-100 dark:bg-zinc-950"
        />
      </div>
    </form>
  );
}
