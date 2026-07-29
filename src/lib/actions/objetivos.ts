"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type ObjetivoInput = {
  objetivo: string;
  metrica: string;
  baseline: string;
  meta: string;
  prazo: string;
};

export async function addObjetivo(clientId: string, data: ObjetivoInput) {
  const count = await prisma.objetivo.count({ where: { clientId } });
  await prisma.objetivo.create({ data: { clientId, ...data, order: count } });
  revalidatePath(`/clients/${clientId}`);
}

export async function updateObjetivo(
  id: string,
  clientId: string,
  data: Partial<ObjetivoInput>
) {
  await prisma.objetivo.update({ where: { id }, data });
  revalidatePath(`/clients/${clientId}`);
}

export async function deleteObjetivo(id: string, clientId: string) {
  await prisma.objetivo.delete({ where: { id } });
  revalidatePath(`/clients/${clientId}`);
}
