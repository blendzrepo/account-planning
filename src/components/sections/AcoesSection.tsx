import type { ClientDetail } from "@/lib/queries";
import { addAcao, updateAcao, deleteAcao } from "@/lib/actions/acoes";
import SectionShell from "@/components/ui/SectionShell";
import EditableTable, { type Column } from "@/components/ui/EditableTable";

const STATUS_OPTIONS = [
  { value: "Não iniciado", label: "Não iniciado" },
  { value: "Em andamento", label: "Em andamento" },
  { value: "Concluído", label: "Concluído" },
  { value: "Atrasado", label: "Atrasado" },
];

const COLUMNS: Column[] = [
  { key: "iniciativa", label: "Iniciativa", type: "textarea" },
  { key: "objetivoRelacionado", label: "Objetivo relacionado", type: "text" },
  { key: "responsavel", label: "Responsável", type: "text" },
  { key: "prazo", label: "Prazo", type: "text" },
  { key: "recursos", label: "Recursos", type: "text" },
  { key: "status", label: "Status", type: "select", options: STATUS_OPTIONS },
];

export default function AcoesSection({ client }: { client: ClientDetail }) {
  async function handleAdd(data: Record<string, string>) {
    "use server";
    await addAcao(client.id, {
      iniciativa: data.iniciativa ?? "",
      objetivoRelacionado: data.objetivoRelacionado ?? "",
      responsavel: data.responsavel ?? "",
      prazo: data.prazo ?? "",
      recursos: data.recursos ?? "",
      status: data.status ?? "",
    });
  }

  async function handleUpdate(id: string, data: Record<string, string>) {
    "use server";
    await updateAcao(id, client.id, data);
  }

  async function handleDelete(id: string) {
    "use server";
    await deleteAcao(id, client.id);
  }

  return (
    <SectionShell
      id="acoes"
      number="08"
      title="Plano de ação"
      subtitle="Iniciativas concretas com responsáveis, prazos e recursos."
    >
      <EditableTable
        columns={COLUMNS}
        rows={client.acoes}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        emptyLabel="Nenhuma iniciativa cadastrada ainda."
      />
    </SectionShell>
  );
}
