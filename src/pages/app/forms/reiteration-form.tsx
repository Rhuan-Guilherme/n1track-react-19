import { createReiterationApi } from "@/api/create-reiteration-api";
import { Combobox } from "@/components/combobox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePersistedForm } from "@/hooks/set-value-form-local-storage";
import { queryClient } from "@/lib/query-cleint";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Crown } from "lucide-react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  login: z.string(),
  ramal: z.string(),
  chamado: z.string(),
});

interface User {
  id: string;
  login: string;
  name: string;
  cargo: string;
  area: string;
  vip: boolean;
}

type formType = z.infer<typeof formSchema>;

export function ReiterationForm() {
  const [area, setArea] = useState("");
  const [cargo, setCargo] = useState("");
  const [vip, setVip] = useState(false);

  const { clearFormStorage, handleChange } = usePersistedForm("n1track");

  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const { register, handleSubmit, watch, setValue, reset } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: localStorage.getItem("@n1track-form-name") || undefined,
      ramal: localStorage.getItem("@n1track-form-ramal") || undefined,
      login: localStorage.getItem("@n1track-form-login") || undefined,
      chamado: localStorage.getItem("@n1track-form-chamado") || undefined,
    },
  });

  const loginWatched = watch("login");

  const { mutateAsync: createReiterationApiFn, isPending } = useMutation({
    mutationFn: createReiterationApi,
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["tickets"] });
      await queryClient.invalidateQueries({
        queryKey: ["performace"],
      });
    },
  });

  async function handleSubmitFormTicket(data: formType) {
    try {
      await createReiterationApiFn({ ...data, area, cargo, vip });
      clearFormStorage();
      reset();
    } catch (error) {
      console.error(error);
    }
  }

  const handleSelectLogin = (user: User) => {
    if (user.vip) {
      setVip(true);
    }
    setValue("login", user.login);
    setValue("name", user.name);
    setCargo(user.cargo);
    setArea(user.area);

    const loginEvent = {
      target: { name: "login", value: user.login },
    } as React.FocusEvent<HTMLInputElement>;
    const nomeEvent = {
      target: { name: "name", value: user.name },
    } as React.FocusEvent<HTMLInputElement>;

    handleChange(loginEvent);
    handleChange(nomeEvent);
  };

  return (
    <>
      <title>N1track | Reiteração</title>

      <form
        onSubmit={handleSubmit(handleSubmitFormTicket)}
        className="dark:bg-accent border-accent-foreground/10 relative flex flex-col items-center justify-center gap-5 rounded-md border p-5 md:w-8/10 lg:w-7/10 xl:w-1/2"
      >
        {loginWatched && loginWatched.length > 2 && area && (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  asChild
                  type="button"
                  className={`text-foreground font-poppins sm absolute -top-4.5 right-1 z-10 flex gap-1.5 rounded-sm border px-3 text-xs sm:top-1 lg:top-4 lg:right-6 xl:text-sm ${vip ? "border-amber-600 bg-amber-400/30" : "border-indigo-600 bg-indigo-400/30"}`}
                >
                  {vip ? (
                    <div className="flex items-center justify-center">
                      <Crown className="h-4 w-4" />
                      <span className="font-robotoMono">VIP - </span>
                      {cargo}
                    </div>
                  ) : (
                    <div className="">{cargo}</div>
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <div className="font-poppins">{area}</div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}
        <div className="flex w-full gap-3">
          <div className="flex w-full flex-col gap-3">
            <Label>Nome</Label>
            <Input
              {...register("name")}
              type="text"
              onChange={handleChange}
              className="border-accent-foreground/15 bg-zinc-100 dark:bg-zinc-950"
            />
          </div>
          <div className="relative flex w-full flex-col gap-3">
            <Label>Login</Label>

            <Input
              {...register("login")}
              type="text"
              className="border-accent-foreground/15 bg-zinc-100 dark:bg-zinc-950"
              onInputCapture={handleChange}
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                if (target.value.length < 2) {
                  setArea("");
                  setCargo("");
                  setVip(false);
                }
              }}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />

            {loginWatched && loginWatched.length > 2 && (
              <Combobox
                onSelect={handleSelectLogin}
                searchValue={loginWatched}
                isInputFocused={isInputFocused}
              />
            )}
          </div>
        </div>
        <div className="flex w-full gap-3">
          <div className="flex w-full flex-col gap-3">
            <Label>Ramal</Label>
            <Input
              {...register("ramal")}
              type="text"
              onChange={handleChange}
              className="border-accent-foreground/15 bg-zinc-100 dark:bg-zinc-950"
            />
          </div>
          <div className="flex w-full flex-col gap-3">
            <Label>Nº do chamado</Label>
            <Input
              {...register("chamado")}
              type="text"
              onChange={handleChange}
              className="border-accent-foreground/15 bg-zinc-100 dark:bg-zinc-950"
            />
          </div>
        </div>

        <div className="flex w-full justify-start">
          <Button disabled={isPending} className="cursor-pointer" type="submit">
            {isPending ? "Aguarde..." : "Registrar"}
          </Button>
        </div>
      </form>
    </>
  );
}
