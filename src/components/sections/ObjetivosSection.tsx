import type { ClientDetail } from "@/lib/queries";
import { addObjetivo, updateObjetivo, deleteObjetivo } from "@/lib/actions/objetivos";
import SectionShell from "@/components/ui/SectionShell";
import EditableTable, { type Column } from "@/components/ui/EditableTable";

const COLUMNS: Column[] = [
  { key: "objetivo", label: "Objetivo", type: "textarea" },
  { key: "metrica", label: "Métrica / KPI", type: "text" },
  { key: "baseline", label: "Baseline atual", type: "text" },
  { key: "meta", label: "Meta", type: "text" },
  { key: "prazo", label: "Prazo", type: "text" },
];

export default function ObjetivosSection({ client }: { client: ClientDetail }) {
  async function handleAdd(data: Record<string, string>) {
    "use server";
    await addObjetivo(client.id, {
      objetivo: data.objetivo ?? "",
      metrica: data.metrica ?? "",
      baseline: data.baseline ?? "",
      meta: data.meta ?? "",
      prazo: data.prazo ?? "",
    });
  }

  async function handleUpdate(id: string, data: Record<string, string>) {
    "use server";
    await updateObjetivo(id, client.id, data);
  }

  async function handleDelete(id: string) {
    "use server";
    await deleteObjetivo(id, client.id);
  }

  return (
    <SectionShell
      id="objetivos"
      number="03"
      title="Objetivos e metas"
      subtitle="Metas de receita, crescimento, retenção e expansão (cross/up-sell)."
    >
      <EditableTable
        columns={COLUMNS}
        rows={client.objetivos}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        emptyLabel="Nenhum objetivo cadastrado ainda."
      />
    </SectionShell>
  );
}
