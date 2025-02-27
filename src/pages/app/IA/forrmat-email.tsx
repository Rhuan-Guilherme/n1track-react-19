import { formatEmailApi } from "@/api/format-email-api";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormatEmailBody {
  email: string;
}

interface FormatEmailResponse {
  message: string;
  response: string;
}

export function FormatEmail() {
  const { register, handleSubmit, setValue } = useForm<FormatEmailBody>();

  const { isPending, mutateAsync: formatEmailApiFn } = useMutation({
    mutationFn: formatEmailApi,
  });

  async function handleFormatEmail({ email }: FormatEmailBody) {
    const { message, response } = (await formatEmailApiFn(
      email,
    )) as FormatEmailResponse;
    setValue("email", response);
    toast(message);
  }

  return (
    <div className="item-center flex h-screen w-full flex-col gap-5 px-50">
      <h1 className="font-poppins text-2xl font-semibold">
        Formate e-mails utilizando IA
      </h1>
      <form
        onSubmit={handleSubmit(handleFormatEmail)}
        className="grid w-full gap-2"
      >
        <Textarea {...register("email")} placeholder="Cole o e-mail aqui..." />
        <div className="flex items-center gap-4">
          <Button disabled={isPending} className="w-40 cursor-pointer">
            {isPending ? "Aguarde..." : "Formatar texto"}
          </Button>
          {isPending && (
            <div className="aspect-square h-4 w-4 animate-spin rounded-full bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 p-1 drop-shadow-2xl md:h-5 md:w-5">
              <div className="background-blur-md h-full w-full rounded-full bg-slate-100 dark:bg-zinc-900"></div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
