import type { ClientDetail } from "@/lib/queries";
import { updateClientField } from "@/lib/actions/clients";
import { formatCurrencyCompact } from "@/lib/format";
import SectionShell from "@/components/ui/SectionShell";
import StatCard from "@/components/ui/StatCard";
import EditableField from "@/components/ui/EditableField";

export default function SituacaoSection({ client }: { client: ClientDetail }) {
  async function saveReceita(value: string) {
    "use server";
    await updateClientField(client.id, "receitaContratada", value);
  }
  async function saveRenovacao(value: string) {
    "use server";
    await updateClientField(client.id, "renovacaoAberta", value);
  }
  async function saveNps(value: string) {
    "use server";
    await updateClientField(client.id, "npsLabel", value);
  }
  async function saveTempoRelacao(value: string) {
    "use server";
    await updateClientField(client.id, "tempoRelacao", value);
  }
  async function saveHistorico(value: string) {
    "use server";
    await updateClientField(client.id, "historicoRelacionamento", value);
  }
  async function saveProdutos(value: string) {
    "use server";
    await updateClientField(client.id, "produtosContratados", value);
  }
  async function savePosicao(value: string) {
    "use server";
    await updateClientField(client.id, "posicaoCompetitiva", value);
  }
  async function saveRiscosResumo(value: string) {
    "use server";
    await updateClientField(client.id, "riscosPontosAtencaoResumo", value);
  }

  return (
    <SectionShell
      id="situacao"
      number="01"
      title="Análise da situação atual"
      subtitle="Onde o relacionamento está hoje: receita, posição e satisfação."
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Receita contratada (acum.)"
          displayValue={formatCurrencyCompact(client.receitaContratada)}
          rawValue={client.receitaContratada?.toString() ?? ""}
          onSave={saveReceita}
        />
        <StatCard
          label="Renovação (aberta)"
          displayValue={formatCurrencyCompact(client.renovacaoAberta)}
          rawValue={client.renovacaoAberta?.toString() ?? ""}
          onSave={saveRenovacao}
        />
        <StatCard
          label="Satisfação / NPS"
          displayValue={client.npsLabel || "‹ NPS ›"}
          rawValue={client.npsLabel ?? ""}
          onSave={saveNps}
        />
        <StatCard
          label="Tempo de relação"
          displayValue={client.tempoRelacao || "‹ tempo ›"}
          rawValue={client.tempoRelacao ?? ""}
          onSave={saveTempoRelacao}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <InfoCard title="Histórico do relacionamento">
          <EditableField value={client.historicoRelacionamento ?? ""} onSave={saveHistorico} multiline />
        </InfoCard>
        <InfoCard title="Produtos / serviços contratados">
          <EditableField value={client.produtosContratados ?? ""} onSave={saveProdutos} multiline />
        </InfoCard>
        <InfoCard title="Posição competitiva">
          <EditableField
            value={client.posicaoCompetitiva ?? ""}
            onSave={savePosicao}
            multiline
            placeholder="preencher: concorrentes presentes na conta e onde atuam"
          />
        </InfoCard>
        <InfoCard title="Riscos e pontos de atenção">
          <EditableField value={client.riscosPontosAtencaoResumo ?? ""} onSave={saveRiscosResumo} multiline />
        </InfoCard>
      </div>
    </SectionShell>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-white border border-card-border p-5">
      <h3 className="text-sm font-bold text-navy uppercase tracking-wide mb-2">{title}</h3>
      <div className="text-sm text-gray-700 leading-relaxed">{children}</div>
    </div>
  );
}
