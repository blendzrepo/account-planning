import type { ReactNode } from "react";
import type { ClientDetail } from "@/lib/queries";
import { addSwotItem, updateSwotItem, deleteSwotItem } from "@/lib/actions/swot";
import { SwotTipo } from "@/generated/prisma/enums";
import SectionShell from "@/components/ui/SectionShell";
import EditableList from "@/components/ui/EditableList";

function TrendingUpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <polyline points="3 17 9 11 13 15 21 7" />
      <polyline points="15 7 21 7 21 13" />
    </svg>
  );
}

function TrendingDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <polyline points="3 7 9 13 13 9 21 17" />
      <polyline points="15 17 21 17 21 11" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function AlertTriangleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

const QUADRANTS: {
  tipo: SwotTipo;
  title: string;
  badgeClass: string;
  icon: ReactNode;
  placeholder: string;
}[] = [
  {
    tipo: SwotTipo.FORCA,
    title: "Forças",
    badgeClass: "bg-teal/15 text-teal",
    icon: <TrendingUpIcon />,
    placeholder: "preencher: pontos fortes internos",
  },
  {
    tipo: SwotTipo.FRAQUEZA,
    title: "Fraquezas",
    badgeClass: "bg-accent/15 text-accent",
    icon: <TrendingDownIcon />,
    placeholder: "preencher: lacunas internas — ex.: concentração em poucos patrocinadores, cobertura de áreas",
  },
  {
    tipo: SwotTipo.OPORTUNIDADE,
    title: "Oportunidades",
    badgeClass: "bg-indigo-500/15 text-indigo-600",
    icon: <TargetIcon />,
    placeholder: "preencher: oportunidades externas de expansão",
  },
  {
    tipo: SwotTipo.AMEACA,
    title: "Ameaças",
    badgeClass: "bg-red-700/10 text-red-700",
    icon: <AlertTriangleIcon />,
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
            <div key={q.tipo} className="rounded-lg bg-white border border-card-border p-5">
              <div className="flex items-center gap-2.5 mb-3">
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${q.badgeClass}`}>
                  {q.icon}
                </span>
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
