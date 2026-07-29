import type { ClientDetail } from "@/lib/queries";
import { addOportunidade, updateOportunidade, deleteOportunidade } from "@/lib/actions/oportunidades";
import { formatCurrencyFull } from "@/lib/format";
import SectionShell from "@/components/ui/SectionShell";
import EditableTable, { type Column } from "@/components/ui/EditableTable";

const COLUMNS: Column[] = [
  { key: "nome", label: "Oportunidade", type: "text" },
  { key: "solucao", label: "Solução / oferta", type: "text" },
  { key: "valorPotencial", label: "Valor potencial", type: "number", displayKey: "valorPotencialDisplay" },
  { key: "estagio", label: "Estágio", type: "text" },
  { key: "probabilidade", label: "Probab. (%)", type: "number" },
  { key: "proximoPasso", label: "Próximo passo", type: "textarea" },
];

function toNumber(value: string): number | null {
  if (value.trim() === "") return null;
  const n = Number(value);
  return Number.isNaN(n) ? null : n;
}

export default function OportunidadesSection({ client }: { client: ClientDetail }) {
  async function handleAdd(data: Record<string, string>) {
    "use server";
    await addOportunidade(client.id, {
      nome: data.nome ?? "",
      solucao: data.solucao ?? "",
      valorPotencial: toNumber(data.valorPotencial ?? ""),
      estagio: data.estagio ?? "",
      probabilidade: toNumber(data.probabilidade ?? ""),
      proximoPasso: data.proximoPasso ?? "",
    });
  }

  async function handleUpdate(id: string, data: Record<string, string>) {
    "use server";
    await updateOportunidade(id, client.id, {
      nome: data.nome,
      solucao: data.solucao,
      valorPotencial: data.valorPotencial !== undefined ? toNumber(data.valorPotencial) : undefined,
      estagio: data.estagio,
      probabilidade: data.probabilidade !== undefined ? toNumber(data.probabilidade) : undefined,
      proximoPasso: data.proximoPasso,
    });
  }

  async function handleDelete(id: string) {
    "use server";
    await deleteOportunidade(id, client.id);
  }

  const rows = client.oportunidades.map((o) => ({
    ...o,
    valorPotencialDisplay: formatCurrencyFull(o.valorPotencial),
  }));

  return (
    <SectionShell
      id="oportunidades"
      number="04"
      title="Oportunidades e pipeline"
      subtitle="Oportunidades e whitespace. Valores = deals em aberto."
    >
      <EditableTable
        columns={COLUMNS}
        rows={rows}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        emptyLabel="Nenhuma oportunidade cadastrada ainda."
      />
    </SectionShell>
  );
}
