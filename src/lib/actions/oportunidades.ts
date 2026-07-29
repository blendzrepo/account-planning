"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type OportunidadeInput = {
  nome: string;
  solucao: string;
  valorPotencial: number | null;
  estagio: string;
  probabilidade: number | null;
  proximoPasso: string;
};

export async function addOportunidade(clientId: string, data: OportunidadeInput) {
  const count = await prisma.oportunidade.count({ where: { clientId } });
  await prisma.oportunidade.create({ data: { clientId, ...data, order: count } });
  revalidatePath(`/clients/${clientId}`);
}

export async function updateOportunidade(
  id: string,
  clientId: string,
  data: Partial<OportunidadeInput>
) {
  await prisma.oportunidade.update({ where: { id }, data });
  revalidatePath(`/clients/${clientId}`);
}

export async function deleteOportunidade(id: string, clientId: string) {
  await prisma.oportunidade.delete({ where: { id } });
  revalidatePath(`/clients/${clientId}`);
}
