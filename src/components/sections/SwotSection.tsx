import type { ClientDetail } from "@/lib/queries";
import { addSwotItem, updateSwotItem, deleteSwotItem } from "@/lib/actions/swot";
import { SwotTipo } from "@/generated/prisma/enums";
import SectionShell from "@/components/ui/SectionShell";
import EditableList from "@/components/ui/EditableList";

const QUADRANTS: { tipo: SwotTipo; title: string; color: string; placeholder: string }[] = [
  {
    tipo: SwotTipo.FORCA,
    title: "Forças",
    color: "bg-teal",
    placeholder: "preencher: pontos fortes internos",
  },
  {
    tipo: SwotTipo.FRAQUEZA,
    title: "Fraquezas",
    color: "bg-accent",
    placeholder: "preencher: lacunas internas — ex.: concentração em poucos patrocinadores, cobertura de áreas",
  },
  {
    tipo: SwotTipo.OPORTUNIDADE,
    title: "Oportunidades",
    color: "bg-indigo-500",
    placeholder: "preencher: oportunidades externas de expansão",
  },
  {
    tipo: SwotTipo.AMEACA,
    title: "Ameaças",
    color: "bg-red-800",
    placeholder: "preencher: ameaças externas ao relacionamento",
  },
];

export default function SwotSection({ client }: { client: ClientDetail }) {
  return (
    <SectionShell
      id="swot"
      number="06"
      title="Análise SWOT da conta"
      subtitle="Fatores internos e externos que afetam o relacionamento."
    >
      <div className="grid md:grid-cols-2 gap-4">
        {QUADRANTS.map((q) => {
          async function handleAdd(texto: string) {
            "use server";
            await addSwotItem(client.id, q.tipo, texto);
          }
          async function handleUpdate(id: string, texto: string) {
            "use server";
            await updateSwotItem(id, client.id, texto);
          }
          async function handleDelete(id: string) {
            "use server";
            await deleteSwotItem(id, client.id);
          }

          return (
            <div key={q.tipo} className="rounded-lg bg-card border border-card-border p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className={`h-4 w-4 rounded ${q.color}`} />
                <h3 className="text-base font-bold text-navy">{q.title}</h3>
              </div>
              <EditableList
                items={client.swotItems.filter((i) => i.tipo === q.tipo)}
                onAdd={handleAdd}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                placeholder={q.placeholder}
              />
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}
