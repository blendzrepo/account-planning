import { getClientDetail } from "@/lib/queries";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/button-styles";

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
    <div className="max-w-5xl mx-auto px-4 py-6 md:px-8 md:py-10">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 mb-8 pb-6 border-b border-card-border md:mb-10">
        <div>
          <h1 className="text-xl font-extrabold text-navy md:text-2xl">{client.name}</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Account Business Plan{client.tag ? ` · ${client.tag}` : ""}
          </p>
        </div>
        <Link href={`/clients/${client.id}/settings`} className={buttonClasses("primary", "sm")}>
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
