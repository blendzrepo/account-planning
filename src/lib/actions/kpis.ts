"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type KpiInput = {
  kpi: string;
  meta: string;
  frequencia: string;
};

export async function addKpi(clientId: string, data: KpiInput) {
  const count = await prisma.metricaKpi.count({ where: { clientId } });
  await prisma.metricaKpi.create({ data: { clientId, ...data, order: count } });
  revalidatePath(`/clients/${clientId}`);
}

export async function updateKpi(
  id: string,
  clientId: string,
  data: Partial<KpiInput>
) {
  await prisma.metricaKpi.update({ where: { id }, data });
  revalidatePath(`/clients/${clientId}`);
}

export async function deleteKpi(id: string, clientId: string) {
  await prisma.metricaKpi.delete({ where: { id } });
  revalidatePath(`/clients/${clientId}`);
}
