import { createCalledApi } from "@/api/create-called-api";
import { formatTextApi } from "@/api/format-text-api";
import { getCriticalApi } from "@/api/get-critical";
import { Combobox } from "@/components/combobox";
import { ComboboxInfos } from "@/components/comboboxInfos";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePersistedForm } from "@/hooks/set-value-form-local-storage";
import { queryClient } from "@/lib/query-cleint";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AlertCircleIcon, Brain, Crown } from "lucide-react";

import { useEffect, useState } from "react";
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

interface Binds {
  id: string;
  title: string;
  description: string;
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
  const [critico, setCritico] = useState<boolean>(false);
  const [area, setArea] = useState("");
  const [cargo, setCargo] = useState("");
  const [vip, setVip] = useState(false);
  const { clearFormStorage, handleChange } = usePersistedForm("n1track");
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [isInputFocusedInfo, setIsInputFocusedInfo] = useState<boolean>(false);
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

    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["tickets"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["performace"],
      });
    },
  });

  const { data: critical } = useQuery({
    queryKey: ["critical"],
    queryFn: getCriticalApi,
  });

  useEffect(() => {
    if (critico && critical) {
      setValue("informacao", critical.description);
    } else if (!critico) {
      setValue(
        "informacao",
        localStorage.getItem("@n1track-form-informacao") || "",
      );
    }
  }, [critical, critico, setValue]);

  async function handleSubmitFormTicket(data: formType) {
    try {
      await createCalledApiFn({ ...data, area, cargo, vip });
      clearFormStorage();
      reset();
      if (critico && critical) {
        setValue("informacao", critical.description);
      }
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

  const handleSelectInfos = (bind: Binds) => {
    setValue("informacao", bind.description);

    const infoEvent = {
      target: { name: "informacao", value: bind.description },
    } as React.FocusEvent<HTMLInputElement>;

    handleChange(infoEvent);
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
        className="dark:bg-accent border-accent-foreground/10 relative flex w-9/10 flex-col items-center justify-center gap-5 rounded-md border p-5 md:w-8/10 lg:w-7/10 xl:w-2/3 2xl:w-1/2"
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
              autoComplete="off"
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
                searchValue={loginWatched.toLocaleLowerCase()}
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
              autoComplete="off"
              className="border-accent-foreground/15 bg-zinc-100 dark:bg-zinc-950"
              onFocus={() => setIsInputFocusedInfo(true)}
              onInputCapture={handleChange}
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                if (target.value.length < 2) {
                  setArea("");
                  setCargo("");
                  setVip(false);
                }
              }}
              onBlur={() => setIsInputFocusedInfo(false)}
            />
            {infoWatched && infoWatched.length > 2 && (
              <ComboboxInfos
                onSelect={handleSelectInfos}
                searchValue={infoWatched.toLocaleLowerCase()}
                isInputFocused={isInputFocusedInfo}
              />
            )}
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
                      <SelectItem value="Anexo 2A / 6° andar / Gabinete Ministra Cármen Lúcia">
                        Gabinete Min. Cármen Lúcia
                      </SelectItem>
                      <SelectItem value="Anexo 2A / 6° andar / Gabinete Ministro Gilmar Mendes">
                        Gabinete Min. Gilmar Mendes
                      </SelectItem>
                      <SelectItem value="Anexo 2A / 5° andar / Gabinete Ministro André Mendonça">
                        Gabinete Min. André Mendonça
                      </SelectItem>
                      <SelectItem value="Anexo 2A / 4° andar / Gabinete Ministro Dias Toffoli">
                        Gabinete Min. Dias Toffoli
                      </SelectItem>
                      <SelectItem value="Anexo 2A / 5° andar / Gabinete Ministro Nunes Marques">
                        Gabinete Min. Nunes Marques
                      </SelectItem>
                      <SelectItem value="Anexo 2A / 4° andar / Gabinete Ministro Cristiano Zanin">
                        Gabinete Min. Cristiano Zanin
                      </SelectItem>
                      <SelectItem value="Anexo 2A / 3° andar / Gabinete Ministro Luiz Fux">
                        Gabinete Min. Luiz Fux
                      </SelectItem>
                      <SelectItem value="Anexo 2A / 5° andar / Gabinete Ministro Flávio Dino">
                        Gabinete Min. Flávio Dino
                      </SelectItem>
                      <SelectItem value="Anexo 2A / 3° andar / Gabinete Ministro Edson Fachin">
                        Gabinete Min. Edson Fachin
                      </SelectItem>
                      <SelectItem value="Anexo 2A / 3° andar / Gabinete Ministro Alexandre de Moraes">
                        Gabinete Min. Alexandre de Moraes
                      </SelectItem>
                    </SelectContent>
                  </Select>
                );
              }}
            ></Controller>
          </div>
        </div>
        <div className="flex w-full justify-start gap-3">
          <Button disabled={isPending} className="cursor-pointer" type="submit">
            {isPending ? "Aguarde..." : "Registrar"}
          </Button>
          {critical && (
            <div>
              <Alert className="flex items-center justify-center border-rose-500">
                <AlertCircleIcon />
                <AlertDescription className="flex items-center justify-center">
                  {critical.title}. Link: {critical.link}{" "}
                </AlertDescription>
                <Switch onCheckedChange={() => setCritico(!critico)} />
              </Alert>
            </div>
          )}
        </div>
      </form>
    </>
  );
}
