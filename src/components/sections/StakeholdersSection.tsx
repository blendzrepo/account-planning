import type { ClientDetail } from "@/lib/queries";
import { addStakeholder, updateStakeholder, deleteStakeholder } from "@/lib/actions/stakeholders";
import { PapelStakeholder, NivelPoder } from "@/generated/prisma/enums";
import SectionShell from "@/components/ui/SectionShell";
import StakeholderCards, { type BadgeOption } from "@/components/ui/StakeholderCards";

const PAPEL_OPTIONS: BadgeOption[] = [
  { value: PapelStakeholder.DECISOR, label: "Decisor", badgeClass: "bg-navy text-white" },
  { value: PapelStakeholder.INFLUENCIADOR, label: "Influenciador", badgeClass: "bg-teal text-white" },
  { value: PapelStakeholder.COMPRAS, label: "Compras", badgeClass: "bg-accent text-white" },
  { value: PapelStakeholder.PATROCINADOR, label: "Patrocinador", badgeClass: "bg-indigo-500 text-white" },
  { value: PapelStakeholder.USUARIO, label: "Usuário", badgeClass: "bg-gray-400 text-white" },
];

const PODER_OPTIONS: BadgeOption[] = [
  { value: NivelPoder.ALTO, label: "Alto", badgeClass: "bg-red-100 text-red-700" },
  { value: NivelPoder.MEDIO, label: "Médio", badgeClass: "bg-amber-100 text-amber-700" },
  { value: NivelPoder.BAIXO, label: "Baixo", badgeClass: "bg-gray-100 text-gray-600" },
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
      <StakeholderCards
        rows={client.stakeholders}
        papelOptions={PAPEL_OPTIONS}
        poderOptions={PODER_OPTIONS}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </SectionShell>
  );
}
