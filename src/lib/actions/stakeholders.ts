"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { PapelStakeholder, NivelPoder } from "@/generated/prisma/enums";

export type StakeholderInput = {
  nome: string;
  cargo: string;
  papel: PapelStakeholder;
  poder: NivelPoder;
  agenda: string;
  estrategia: string;
  linkedinHighlight: string;
};

export async function addStakeholder(clientId: string, data: StakeholderInput) {
  const count = await prisma.stakeholder.count({ where: { clientId } });
  await prisma.stakeholder.create({
    data: { clientId, ...data, order: count },
  });
  revalidatePath(`/clients/${clientId}`);
}

export async function updateStakeholder(
  id: string,
  clientId: string,
  data: Partial<StakeholderInput>
) {
  await prisma.stakeholder.update({ where: { id }, data });
  revalidatePath(`/clients/${clientId}`);
}

export async function deleteStakeholder(id: string, clientId: string) {
  await prisma.stakeholder.delete({ where: { id } });
  revalidatePath(`/clients/${clientId}`);
}
