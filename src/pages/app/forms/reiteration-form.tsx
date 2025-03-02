import { createReiterationApi } from "@/api/create-reiteration-api";
import { Combobox } from "@/components/combobox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePersistedForm } from "@/hooks/set-value-form-local-storage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

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
  id: number;
  login: string;
  name: string;
}

type formType = z.infer<typeof formSchema>;

export function ReiterationForm() {
  const { clearFormStorage, handleChange } = usePersistedForm("n1track");

  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const { register, handleSubmit, watch, setValue, reset } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: localStorage.getItem("@n1track-form-nome") || undefined,
      ramal: localStorage.getItem("@n1track-form-ramal") || undefined,
      login: localStorage.getItem("@n1track-form-login") || undefined,
      chamado: localStorage.getItem("@n1track-form-chamado") || undefined,
    },
  });

  const loginWatched = watch("login");

  const { mutateAsync: createReiterationApiFn } = useMutation({
    mutationFn: createReiterationApi,
  });

  async function handleSubmitFormTicket(data: formType) {
    try {
      await createReiterationApiFn(data);
      clearFormStorage();
      reset();
    } catch (error) {
      console.error(error);
    }
  }

  const handleSelectLogin = (user: User) => {
    setValue("login", user.login);
    setValue("name", user.name);

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
        className="dark:bg-accent border-accent-foreground/10 flex flex-col items-center justify-center gap-5 rounded-md border p-5 md:w-8/10 lg:w-7/10 xl:w-1/2"
      >
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
          <Button type="submit">Registrar</Button>
        </div>
      </form>
    </>
  );
}
