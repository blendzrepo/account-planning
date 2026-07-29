"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { PropostaTipo } from "@/generated/prisma/enums";

export async function addPropostaItem(clientId: string, tipo: PropostaTipo, texto: string) {
  const count = await prisma.propostaValorItem.count({ where: { clientId, tipo } });
  await prisma.propostaValorItem.create({ data: { clientId, tipo, texto, order: count } });
  revalidatePath(`/clients/${clientId}`);
}

export async function updatePropostaItem(id: string, clientId: string, texto: string) {
  await prisma.propostaValorItem.update({ where: { id }, data: { texto } });
  revalidatePath(`/clients/${clientId}`);
}

export async function deletePropostaItem(id: string, clientId: string) {
  await prisma.propostaValorItem.delete({ where: { id } });
  revalidatePath(`/clients/${clientId}`);
}
