import { createCalledApi } from "@/api/create-called-api";
import { formatTextApi } from "@/api/format-text-api";
import { Combobox } from "@/components/combobox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Brain, Star } from "lucide-react";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  login: z.string(),
  ramal: z.string(),
  patrimono: z.string(),
  informacao: z.string(),
  local: z.string(),
});

interface User {
  id: string;
  login: string;
  name: string;
  area: string;
  cargo: string;
  vip: boolean;
}

type formType = z.infer<typeof formSchema>;

interface FormatEmailBody {
  text: string;
}

interface FormatEmailResponse {
  message: string;
  response: string;
}

export function CalledForm() {
  const [area, setArea] = useState("");
  const [cargo, setCargo] = useState("");
  const [vip, setVip] = useState(false);
  const { clearFormStorage, handleChange } = usePersistedForm("n1track");
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const { register, handleSubmit, control, watch, setValue, reset } =
    useForm<formType>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: localStorage.getItem("@n1track-form-name") || undefined,
        ramal: localStorage.getItem("@n1track-form-ramal") || undefined,
        login: localStorage.getItem("@n1track-form-login") || undefined,
        patrimono: localStorage.getItem("@n1track-form-patrimono") || undefined,
        informacao:
          localStorage.getItem("@n1track-form-informacao") || undefined,
        local: localStorage.getItem("@n1track-form-local") || undefined,
      },
    });

  const loginWatched = watch("login");
  const infoWatched = watch("informacao");

  const { mutateAsync: createCalledApiFn, isPending } = useMutation({
    mutationFn: createCalledApi,

    async onSuccess(data) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(["tickets"], (oldData: any) => {
        if (!oldData) return { tickets: [data.ticket] };

        return {
          ...oldData,
          tickets: [data.ticket, ...oldData.tickets],
        };
      });
    },
  });

  async function handleSubmitFormTicket(data: formType) {
    try {
      await createCalledApiFn({ ...data, area, cargo, vip });
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

  const { isPending: pedingFormat, mutateAsync: formatTextApiFn } = useMutation(
    {
      mutationFn: formatTextApi,
    },
  );

  async function handleText({ text }: FormatEmailBody) {
    const { message, response } = (await formatTextApiFn(
      text,
    )) as FormatEmailResponse;
    setValue("informacao", response);
    toast(message);
  }

  return (
    <>
      <title>N1Track | Chamados</title>
      <form
        onSubmit={handleSubmit(handleSubmitFormTicket)}
        className="dark:bg-accent border-accent-foreground/10 relative flex w-9/10 flex-col items-center justify-center gap-5 rounded-md border p-5 md:w-8/10 lg:w-7/10 xl:w-1/2"
      >
        {loginWatched && loginWatched.length > 2 && area && (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  asChild
                  type="button"
                  className="text-foreground font-poppins absolute top-4 right-6 z-10 flex gap-1.5 rounded-sm border border-indigo-600 bg-indigo-400/30 px-3 text-sm"
                >
                  <div className="">{cargo}</div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="font-poppins">{area}</div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}

        {loginWatched && loginWatched.length > 2 && vip && (
          <div className="text-foreground font-poppins absolute top-4 right-41 z-10 flex gap-1.5 rounded-sm border border-amber-600 bg-amber-400/30 p-0.5 px-3 text-sm">
            <Star className="h-4 w-4 text-amber-400" />
          </div>
        )}

        <div className="flex w-full gap-3">
          <div className="flex w-full flex-col gap-3">
            <Label>Nome</Label>
            <Input
              {...register("name")}
              onChange={handleChange}
              type="text"
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
              onInputCapture={handleChange}
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                if (target.value.length < 2) {
                  setArea("");
                  setCargo("");
                  setVip(false);
                }
              }}
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
            <Label>Patrimônio</Label>
            <Input
              {...register("patrimono")}
              type="text"
              onChange={handleChange}
              className="border-accent-foreground/15 bg-zinc-100 dark:bg-zinc-950"
            />
          </div>
        </div>

        <div className="relative flex w-full">
          <div className="w-full">
            {" "}
            <Label>Informação</Label>
            <Input
              {...register("informacao")}
              type="text"
              onInputCapture={handleChange}
              className="border-accent-foreground/15 bg-zinc-100 dark:bg-zinc-950"
            />
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                {pedingFormat ? (
                  <div className="absolute top-[31px] right-2 aspect-square h-4 w-4 animate-spin rounded-full bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 p-1 drop-shadow-2xl md:h-5 md:w-5">
                    <div className="background-blur-md h-full w-full rounded-full bg-slate-100 dark:bg-zinc-900"></div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleText({ text: infoWatched })}
                    className="absolute top-[27px] right-1 cursor-pointer p-1"
                  >
                    <Brain className="h-5 w-5" />
                  </button>
                )}
              </TooltipTrigger>
              <TooltipContent>
                <div className="font-poppins font-semibold">
                  Clique e corrija seu texto com IA
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex w-full gap-3">
          <div className="flex w-full flex-col gap-3">
            <Label>Local</Label>
            <Input
              {...register("local")}
              onChange={(e) => setValue("local", e.target.value)}
              type="text"
              onBlur={handleChange}
              className="border-accent-foreground/15 bg-zinc-100 dark:bg-zinc-950"
            />
          </div>
          <div className="flex w-full flex-col gap-3">
            <Label>Gabinetes</Label>

            <Controller
              control={control}
              name="local"
              render={({ field: { name, onChange, disabled } }) => {
                return (
                  <Select
                    defaultValue=" "
                    name={name}
                    onValueChange={(selectdValue) => {
                      onChange(selectdValue);
                      setValue("local", selectdValue);
                    }}
                    disabled={disabled}
                  >
                    <SelectTrigger className="border-accent-foreground/15 bg-zinc-100 dark:bg-zinc-950">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem className="min-h-6" value=" "></SelectItem>
                      <SelectItem value="Local 1">Local 1</SelectItem>
                      <SelectItem value="Local 2">Local 2</SelectItem>
                      <SelectItem value="Local 3">Local 3</SelectItem>
                    </SelectContent>
                  </Select>
                );
              }}
            ></Controller>
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
