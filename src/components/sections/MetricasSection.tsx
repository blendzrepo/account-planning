import type { ClientDetail } from "@/lib/queries";
import { addKpi, updateKpi, deleteKpi } from "@/lib/actions/kpis";
import { updateClientField } from "@/lib/actions/clients";
import SectionShell from "@/components/ui/SectionShell";
import EditableTable, { type Column } from "@/components/ui/EditableTable";
import EditableField from "@/components/ui/EditableField";

const COLUMNS: Column[] = [
  { key: "kpi", label: "KPI de sucesso", type: "text" },
  { key: "meta", label: "Meta", type: "text" },
  { key: "frequencia", label: "Frequência", type: "text" },
];

export default function MetricasSection({ client }: { client: ClientDetail }) {
  async function handleAdd(data: Record<string, string>) {
    "use server";
    await addKpi(client.id, {
      kpi: data.kpi ?? "",
      meta: data.meta ?? "",
      frequencia: data.frequencia ?? "",
    });
  }

  async function handleUpdate(id: string, data: Record<string, string>) {
    "use server";
    await updateKpi(id, client.id, data);
  }

  async function handleDelete(id: string) {
    "use server";
    await deleteKpi(id, client.id);
  }

  async function saveCadencia(value: string) {
    "use server";
    await updateClientField(client.id, "cadenciaReunioes", value);
  }
  async function saveParticipantes(value: string) {
    "use server";
    await updateClientField(client.id, "participantesChave", value);
  }
  async function saveRevisao(value: string) {
    "use server";
    await updateClientField(client.id, "revisaoPlano", value);
  }

  return (
    <SectionShell
      id="metricas"
      number="09"
      title="Métricas e governança"
      subtitle="KPIs de sucesso e a cadência de acompanhamento do plano."
    >
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <EditableTable
            columns={COLUMNS}
            rows={client.kpis}
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            emptyLabel="Nenhum KPI cadastrado ainda."
          />
        </div>
        <div className="space-y-4">
          <InfoCard title="Cadência de reuniões">
            <EditableField
              value={client.cadenciaReunioes ?? ""}
              onSave={saveCadencia}
              multiline
              placeholder="preencher: QBR trimestral, check-in mensal"
            />
          </InfoCard>
          <InfoCard title="Participantes-chave">
            <EditableField value={client.participantesChave ?? ""} onSave={saveParticipantes} multiline />
          </InfoCard>
          <InfoCard title="Revisão do plano">
            <EditableField
              value={client.revisaoPlano ?? ""}
              onSave={saveRevisao}
              multiline
              placeholder="preencher: quando o ABP é revisado"
            />
          </InfoCard>
        </div>
      </div>
    </SectionShell>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-card border border-card-border p-4">
      <h3 className="text-xs font-bold text-navy uppercase tracking-wide mb-2">{title}</h3>
      <div className="text-sm text-gray-700 leading-relaxed">{children}</div>
    </div>
  );
}
