import { prisma } from "@/lib/prisma";

export async function getClientDetail(id: string, orgId: string) {
  return prisma.client.findUnique({
    where: { id, orgId },
    include: {
      stakeholders: { orderBy: { order: "asc" } },
      objetivos: { orderBy: { order: "asc" } },
      oportunidades: { orderBy: { order: "asc" } },
      riscos: { orderBy: { order: "asc" } },
      swotItems: { orderBy: { order: "asc" } },
      propostaItems: { orderBy: { order: "asc" } },
      acoes: { orderBy: { order: "asc" } },
      kpis: { orderBy: { order: "asc" } },
    },
  });
}

export type ClientDetail = NonNullable<Awaited<ReturnType<typeof getClientDetail>>>;
