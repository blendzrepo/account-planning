import type { ClientDetail } from "@/lib/queries";
import { addPropostaItem, updatePropostaItem, deletePropostaItem } from "@/lib/actions/proposta";
import { updateClientField } from "@/lib/actions/clients";
import { PropostaTipo } from "@/generated/prisma/enums";
import SectionShell from "@/components/ui/SectionShell";
import EditableList from "@/components/ui/EditableList";
import EditableField from "@/components/ui/EditableField";

export default function PropostaSection({ client }: { client: ClientDetail }) {
  async function handleAddDor(texto: string) {
    "use server";
    await addPropostaItem(client.id, PropostaTipo.DOR, texto);
  }
  async function handleUpdateDor(id: string, texto: string) {
    "use server";
    await updatePropostaItem(id, client.id, texto);
  }
  async function handleDeleteDor(id: string) {
    "use server";
    await deletePropostaItem(id, client.id);
  }

  async function handleAddSolucao(texto: string) {
    "use server";
    await addPropostaItem(client.id, PropostaTipo.SOLUCAO, texto);
  }
  async function handleUpdateSolucao(id: string, texto: string) {
    "use server";
    await updatePropostaItem(id, client.id, texto);
  }
  async function handleDeleteSolucao(id: string) {
    "use server";
    await deletePropostaItem(id, client.id);
  }

  async function saveDiferenciais(value: string) {
    "use server";
    await updateClientField(client.id, "diferenciaisConcorrencia", value);
  }

  return (
    <SectionShell
      id="proposta"
      number="07"
      title="Proposta de valor"
      subtitle="Como nossas soluções conectam com as dores e objetivos do cliente."
    >
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="rounded-lg border border-card-border overflow-hidden">
          <div className="bg-navy text-white px-4 py-3 font-bold text-sm">Dores e objetivos do cliente</div>
          <div className="bg-card p-5">
            <EditableList
              items={client.propostaItems.filter((i) => i.tipo === PropostaTipo.DOR)}
              onAdd={handleAddDor}
              onUpdate={handleUpdateDor}
              onDelete={handleDeleteDor}
              placeholder="preencher: dores e objetivos do cliente"
            />
          </div>
        </div>
        <div className="rounded-lg border border-card-border overflow-hidden">
          <div className="bg-teal text-white px-4 py-3 font-bold text-sm">Nossa solução e valor entregue</div>
          <div className="bg-card p-5">
            <EditableList
              items={client.propostaItems.filter((i) => i.tipo === PropostaTipo.SOLUCAO)}
              onAdd={handleAddSolucao}
              onUpdate={handleUpdateSolucao}
              onDelete={handleDeleteSolucao}
              placeholder="preencher: nossa solução e valor entregue"
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-navy text-white p-5">
        <div className="text-xs font-bold text-accent uppercase tracking-wide mb-1">
          Diferenciais vs. concorrência
        </div>
        <EditableField
          value={client.diferenciaisConcorrencia ?? ""}
          onSave={saveDiferenciais}
          multiline
          className="text-white"
        />
      </div>
    </SectionShell>
  );
}
