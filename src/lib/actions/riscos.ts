"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type RiscoInput = {
  risco: string;
  impacto: string;
  probabilidade: string;
  sinaisAlerta: string;
  mitigacao: string;
  responsavel: string;
};

export async function addRisco(clientId: string, data: RiscoInput) {
  const count = await prisma.risco.count({ where: { clientId } });
  await prisma.risco.create({ data: { clientId, ...data, order: count } });
  revalidatePath(`/clients/${clientId}`);
}

export async function updateRisco(
  id: string,
  clientId: string,
  data: Partial<RiscoInput>
) {
  await prisma.risco.update({ where: { id }, data });
  revalidatePath(`/clients/${clientId}`);
}

export async function deleteRisco(id: string, clientId: string) {
  await prisma.risco.delete({ where: { id } });
  revalidatePath(`/clients/${clientId}`);
}
