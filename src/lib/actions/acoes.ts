"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type AcaoInput = {
  iniciativa: string;
  objetivoRelacionado: string;
  responsavel: string;
  prazo: string;
  recursos: string;
  status: string;
};

export async function addAcao(clientId: string, data: AcaoInput) {
  const count = await prisma.acaoPlano.count({ where: { clientId } });
  await prisma.acaoPlano.create({ data: { clientId, ...data, order: count } });
  revalidatePath(`/clients/${clientId}`);
}

export async function updateAcao(
  id: string,
  clientId: string,
  data: Partial<AcaoInput>
) {
  await prisma.acaoPlano.update({ where: { id }, data });
  revalidatePath(`/clients/${clientId}`);
}

export async function deleteAcao(id: string, clientId: string) {
  await prisma.acaoPlano.delete({ where: { id } });
  revalidatePath(`/clients/${clientId}`);
}
