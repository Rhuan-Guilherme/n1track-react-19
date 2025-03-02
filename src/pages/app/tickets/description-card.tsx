interface GetTicketResponse {
  ticket: {
    name: string;
    id: string;
    login: string;
    ramal: string;
    local: string;
    informacao: string;
    patrimono: string;
    chamado: string;
    destinatario: string;
    area: string;
    created_at: string;
    type: "CHAMADO" | "REITERACAO" | "TRANSFERENCIA" | "QUEDA";
    vip: boolean;
    userId: string;
    userName: string;
  };
}

export default function DescriptionCard({ ticket }: GetTicketResponse) {
  return (
    <div className="flex flex-col gap-2 text-sm leading-6">
      {ticket.type === "CHAMADO" && (
        <>
          <p>
            Prezados, Sr(a). {ticket.name.split(" ")[0]} entrou em contato{" "}
            {ticket.informacao}
          </p>
          <p>Nome: {ticket.name}</p>
          <p>Login: {ticket.login}</p>
          <p>Ramal: {ticket.ramal}</p>
          {ticket.local ? <p>Local: {ticket.local}</p> : null}
          {ticket.patrimono ? <p>Patrimônio: {ticket.patrimono}</p> : null}
        </>
      )}

      {ticket.type === "QUEDA" && (
        <>
          <p>
            Senhor(a) não identificado entrou em contato com o helpdesk no ramal
            3416 e interrompeu a ligação antes do atendimento inicial.
          </p>
          <p>Ramal: {ticket.ramal}</p>
        </>
      )}

      {ticket.type === "TRANSFERENCIA" && (
        <>
          <p>
            Senhor(a) {ticket.name} entrou em contato solicitando transferência
            de ligação para o(a) senhor(a) {ticket.destinatario}.
          </p>
          <p>Ramal: {ticket.ramal}</p>
        </>
      )}
      {ticket.type === "REITERACAO" && (
        <>
          <p>
            Senhor(a) {ticket.name} entrou em contato requisitando a reiteração
            e brevidade no chamado{" "}
            <a
              target="_blank"
              className="font-semibold hover:underline"
              href={`https://jira.stf.jus.br/browse/SERVICEDESK-${ticket.chamado}`}
              rel="noreferrer"
            >
              SERVICEDESK-{ticket.chamado}
            </a>
            .
          </p>
          <p>Login: {ticket.login}</p>
          <p>Ramal: {ticket.ramal}</p>
        </>
      )}
    </div>
  );
}
