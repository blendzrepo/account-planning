"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createClient(data: { name: string; tag?: string }) {
  const client = await prisma.client.create({
    data: { name: data.name, tag: data.tag || null },
  });
  revalidatePath("/clients", "layout");
  redirect(`/clients/${client.id}`);
}

export async function renameClient(id: string, data: { name: string; tag?: string }) {
  await prisma.client.update({
    where: { id },
    data: { name: data.name, tag: data.tag || null },
  });
  revalidatePath("/clients", "layout");
}

export async function deleteClient(id: string) {
  await prisma.client.delete({ where: { id } });
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
  const data: Record<string, string | number | null> = {};
  if (NUMERIC_FIELDS.has(field)) {
    const parsed = value.trim() === "" ? null : Number(value);
    data[field] = parsed === null || Number.isNaN(parsed) ? null : parsed;
  } else {
    data[field] = value.trim() === "" ? null : value;
  }
  await prisma.client.update({ where: { id }, data });
  revalidatePath(`/clients/${id}`);
}
