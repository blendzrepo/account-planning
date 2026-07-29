import { getClientDetail } from "@/lib/queries";
import { notFound } from "next/navigation";
import Link from "next/link";

import SituacaoSection from "@/components/sections/SituacaoSection";
import StakeholdersSection from "@/components/sections/StakeholdersSection";
import ObjetivosSection from "@/components/sections/ObjetivosSection";
import OportunidadesSection from "@/components/sections/OportunidadesSection";
import RiscosSection from "@/components/sections/RiscosSection";
import SwotSection from "@/components/sections/SwotSection";
import PropostaSection from "@/components/sections/PropostaSection";
import AcoesSection from "@/components/sections/AcoesSection";
import MetricasSection from "@/components/sections/MetricasSection";

export default async function ClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await getClientDetail(id);
  if (!client) notFound();

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      <div className="flex items-baseline justify-between mb-10 pb-6 border-b border-card-border">
        <div>
          <h1 className="text-2xl font-extrabold text-navy">{client.name}</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Account Business Plan{client.tag ? ` · ${client.tag}` : ""}
          </p>
        </div>
        <Link href={`/clients/${client.id}/settings`} className="text-sm text-gray-400 hover:text-navy hover:underline">
          gerenciar cliente
        </Link>
      </div>

      <SituacaoSection client={client} />
      <StakeholdersSection client={client} />
      <ObjetivosSection client={client} />
      <OportunidadesSection client={client} />
      <RiscosSection client={client} />
      <SwotSection client={client} />
      <PropostaSection client={client} />
      <AcoesSection client={client} />
      <MetricasSection client={client} />
    </div>
  );
}
