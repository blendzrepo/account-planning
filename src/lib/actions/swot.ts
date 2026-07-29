"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { SwotTipo } from "@/generated/prisma/enums";

export async function addSwotItem(clientId: string, tipo: SwotTipo, texto: string) {
  const count = await prisma.swotItem.count({ where: { clientId, tipo } });
  await prisma.swotItem.create({ data: { clientId, tipo, texto, order: count } });
  revalidatePath(`/clients/${clientId}`);
}

export async function updateSwotItem(id: string, clientId: string, texto: string) {
  await prisma.swotItem.update({ where: { id }, data: { texto } });
  revalidatePath(`/clients/${clientId}`);
}

export async function deleteSwotItem(id: string, clientId: string) {
  await prisma.swotItem.delete({ where: { id } });
  revalidatePath(`/clients/${clientId}`);
}
