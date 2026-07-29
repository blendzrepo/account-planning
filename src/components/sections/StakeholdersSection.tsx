import type { ClientDetail } from "@/lib/queries";
import { addStakeholder, updateStakeholder, deleteStakeholder } from "@/lib/actions/stakeholders";
import { PapelStakeholder, NivelPoder } from "@/generated/prisma/enums";
import SectionShell from "@/components/ui/SectionShell";
import EditableTable, { type Column } from "@/components/ui/EditableTable";

const PAPEL_OPTIONS = [
  { value: PapelStakeholder.DECISOR, label: "Decisor" },
  { value: PapelStakeholder.INFLUENCIADOR, label: "Influenciador" },
  { value: PapelStakeholder.COMPRAS, label: "Compras" },
  { value: PapelStakeholder.PATROCINADOR, label: "Patrocinador" },
  { value: PapelStakeholder.USUARIO, label: "Usuário" },
];

const PODER_OPTIONS = [
  { value: NivelPoder.ALTO, label: "Alto" },
  { value: NivelPoder.MEDIO, label: "Médio" },
  { value: NivelPoder.BAIXO, label: "Baixo" },
];

const COLUMNS: Column[] = [
  { key: "nome", label: "Nome", type: "text" },
  { key: "cargo", label: "Cargo / área", type: "text" },
  { key: "papel", label: "Papel", type: "select", options: PAPEL_OPTIONS },
  { key: "poder", label: "Poder", type: "select", options: PODER_OPTIONS },
  { key: "agenda", label: "Agenda / prioridades", type: "textarea" },
  { key: "estrategia", label: "Estratégia de relacionamento", type: "textarea" },
  { key: "linkedinHighlight", label: "Destaque (LinkedIn)", type: "textarea" },
];

export default function StakeholdersSection({ client }: { client: ClientDetail }) {
  async function handleAdd(data: Record<string, string>) {
    "use server";
    await addStakeholder(client.id, {
      nome: data.nome ?? "",
      cargo: data.cargo ?? "",
      papel: (data.papel as PapelStakeholder) || PapelStakeholder.USUARIO,
      poder: (data.poder as NivelPoder) || NivelPoder.MEDIO,
      agenda: data.agenda ?? "",
      estrategia: data.estrategia ?? "",
      linkedinHighlight: data.linkedinHighlight ?? "",
    });
  }

  async function handleUpdate(id: string, data: Record<string, string>) {
    "use server";
    await updateStakeholder(id, client.id, {
      nome: data.nome,
      cargo: data.cargo,
      papel: (data.papel as PapelStakeholder) || undefined,
      poder: (data.poder as NivelPoder) || undefined,
      agenda: data.agenda,
      estrategia: data.estrategia,
      linkedinHighlight: data.linkedinHighlight,
    });
  }

  async function handleDelete(id: string) {
    "use server";
    await deleteStakeholder(id, client.id);
  }

  return (
    <SectionShell
      id="stakeholders"
      number="02"
      title="Mapa de stakeholders"
      subtitle="Papel, poder, agenda e estratégia de relacionamento por contato."
    >
      <EditableTable
        columns={COLUMNS}
        rows={client.stakeholders}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        emptyLabel="Nenhum stakeholder cadastrado ainda."
      />
    </SectionShell>
  );
}
