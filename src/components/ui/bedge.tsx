interface BedgeType {
  type: "CHAMADO" | "REITERACAO" | "TRANSFERENCIA" | "QUEDA";
  status: "ABERTO" | "FECHADO";
  vip: boolean;
}

export default function Bedge({ type, status, vip }: BedgeType) {
  const badgeStyles = {
    CHAMADO: {
      open: "border-indigo-500 bg-indigo-500/30 dark:text-indigo-200 text-indigo-700",
      closed: "border-zinc-500 bg-zinc-500/30 text-zinc-300",
      dotOpen: "bg-indigo-400",
      dotClosed: "bg-zinc-400",
    },
    REITERACAO: {
      open: "border-amber-500 bg-amber-500/30 dark:text-amber-200 text-amber-700",
      closed: "border-zinc-500 bg-zinc-500/30 text-zinc-300",
      dotOpen: "bg-amber-400",
      dotClosed: "bg-zinc-400",
    },
    TRANSFERENCIA: {
      open: "border-green-500 bg-green-500/30 dark:text-green-200 text-green-700",
      closed: "border-zinc-500 bg-zinc-500/30 text-zinc-300",
      dotOpen: "bg-green-400",
      dotClosed: "bg-zinc-400",
    },
    QUEDA: {
      open: "border-rose-500 bg-rose-500/30 dark:text-rose-200 text-rose-700",
      closed: "border-zinc-500 bg-zinc-500/30 text-zinc-300",
      dotOpen: "bg-rose-400",
      dotClosed: "bg-zinc-400",
    },
  };

  const { open, closed, dotOpen, dotClosed } = badgeStyles[type];

  return (
    <span
      className={`font-poppins flex h-5 items-center justify-center gap-2 rounded-md border px-1 text-xs font-semibold ${
        vip
          ? "border-amber-500 bg-amber-500/30 text-amber-200"
          : status === "ABERTO"
            ? open
            : closed
      }`}
    >
      <span
        className={`h-2 w-2 animate-pulse rounded-full ${
          vip ? "bg-amber-400" : status === "ABERTO" ? dotOpen : dotClosed
        }`}
      ></span>
      <p>
        {type === "CHAMADO"
          ? "Chamado"
          : type === "REITERACAO"
            ? "Reiteração"
            : type === "TRANSFERENCIA"
              ? "Transferência"
              : "Queda"}
      </p>
      {vip && <span className="text-[10px] font-bold">(VIP)</span>}
    </span>
  );
}
