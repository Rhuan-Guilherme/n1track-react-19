interface BedgeType {
  type: "CHAMADO" | "REITERACAO" | "TRANSFERENCIA" | "QUEDA";
}

export default function Bedge({ type }: BedgeType) {
  if (type === "CHAMADO") {
    return (
      <span className="font-poppins flex h-5 items-center justify-center gap-2 rounded-md border border-indigo-500 bg-indigo-500/30 px-1 text-xs font-semibold text-indigo-200">
        <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-400"></span>
        <p>Chamado</p>
      </span>
    );
  }

  if (type === "REITERACAO") {
    return (
      <span className="font-poppins flex h-5 items-center justify-center gap-2 rounded-md border border-amber-500 bg-amber-500/30 px-1 text-xs font-semibold text-amber-200">
        <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400"></span>
        <p>Reiteração</p>
      </span>
    );
  }

  if (type === "TRANSFERENCIA") {
    return (
      <span className="font-poppins flex h-5 items-center justify-center gap-2 rounded-md border border-green-500 bg-green-500/30 px-1 text-xs font-semibold text-green-200">
        <span className="h-2 w-2 animate-pulse rounded-full bg-green-400"></span>
        <p>Transferência</p>
      </span>
    );
  }

  if (type === "QUEDA") {
    return (
      <span className="font-poppins flex h-5 items-center justify-center gap-2 rounded-md border border-rose-500 bg-rose-500/30 px-1 text-xs font-semibold text-rose-200">
        <span className="h-2 w-2 animate-pulse rounded-full bg-rose-400"></span>
        <p>Queda</p>
      </span>
    );
  }
}
