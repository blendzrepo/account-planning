import type { ClientDetail } from "@/lib/queries";
import { addRisco, updateRisco, deleteRisco } from "@/lib/actions/riscos";
import SectionShell from "@/components/ui/SectionShell";
import EditableTable, { type Column } from "@/components/ui/EditableTable";

const IMPACTO_OPTIONS = [
  { value: "Alto", label: "Alto" },
  { value: "Médio", label: "Médio" },
  { value: "Baixo", label: "Baixo" },
];

const COLUMNS: Column[] = [
  { key: "risco", label: "Risco", type: "textarea" },
  { key: "impacto", label: "Impacto", type: "select", options: IMPACTO_OPTIONS },
  { key: "probabilidade", label: "Probab.", type: "text" },
  { key: "sinaisAlerta", label: "Sinais de alerta", type: "textarea" },
  { key: "mitigacao", label: "Plano de mitigação", type: "textarea" },
  { key: "responsavel", label: "Responsável", type: "text" },
];

export default function RiscosSection({ client }: { client: ClientDetail }) {
  async function handleAdd(data: Record<string, string>) {
    "use server";
    await addRisco(client.id, {
      risco: data.risco ?? "",
      impacto: data.impacto ?? "",
      probabilidade: data.probabilidade ?? "",
      sinaisAlerta: data.sinaisAlerta ?? "",
      mitigacao: data.mitigacao ?? "",
      responsavel: data.responsavel ?? "",
    });
  }

  async function handleUpdate(id: string, data: Record<string, string>) {
    "use server";
    await updateRisco(id, client.id, data);
  }

  async function handleDelete(id: string) {
    "use server";
    await deleteRisco(id, client.id);
  }

  return (
    <SectionShell
      id="riscos"
      number="05"
      title="Riscos e plano de churn"
      subtitle="Riscos de perda da conta e como mitigá-los."
    >
      <EditableTable
        columns={COLUMNS}
        rows={client.riscos}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        emptyLabel="Nenhum risco cadastrado ainda."
      />
    </SectionShell>
  );
}
