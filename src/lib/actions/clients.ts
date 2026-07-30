"use server";

import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createClient(data: { name: string; tag?: string }) {
  const session = await verifySession();
  const client = await prisma.client.create({
    data: { orgId: session.orgId, name: data.name, tag: data.tag || null },
  });
  revalidatePath("/clients", "layout");
  redirect(`/clients/${client.id}`);
}

export async function renameClient(id: string, data: { name: string; tag?: string }) {
  const session = await verifySession();
  await prisma.client.updateMany({
    where: { id, orgId: session.orgId },
    data: { name: data.name, tag: data.tag || null },
  });
  revalidatePath("/clients", "layout");
}

export async function deleteClient(id: string) {
  const session = await verifySession();
  await prisma.client.deleteMany({ where: { id, orgId: session.orgId } });
  revalidatePath("/clients", "layout");
  redirect("/");
}

export type ClientNarrativeField =
  | "receitaContratada"
  | "renovacaoAberta"
  | "npsLabel"
  | "tempoRelacao"
  | "historicoRelacionamento"
  | "produtosContratados"
  | "posicaoCompetitiva"
  | "riscosPontosAtencaoResumo"
  | "diferenciaisConcorrencia"
  | "cadenciaReunioes"
  | "participantesChave"
  | "revisaoPlano";

const NUMERIC_FIELDS = new Set(["receitaContratada", "renovacaoAberta"]);

export async function updateClientField(
  id: string,
  field: ClientNarrativeField,
  value: string
) {
  const session = await verifySession();
  const data: Record<string, string | number | null> = {};
  if (NUMERIC_FIELDS.has(field)) {
    const parsed = value.trim() === "" ? null : Number(value);
    data[field] = parsed === null || Number.isNaN(parsed) ? null : parsed;
  } else {
    data[field] = value.trim() === "" ? null : value;
  }
  await prisma.client.updateMany({ where: { id, orgId: session.orgId }, data });
  revalidatePath(`/clients/${id}`);
}
