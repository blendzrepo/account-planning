"use server";

import { prisma } from "@/lib/prisma";
import { verifySession, getCurrentUser } from "@/lib/dal";
import { revalidatePath } from "next/cache";

export type UpdateAppearanceState = { error?: string; success?: boolean } | undefined;

const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;

function parseColor(formData: FormData, field: string): string | null | undefined {
  const raw = String(formData.get(field) ?? "").trim();
  if (!raw) return null;
  if (!HEX_COLOR.test(raw)) return undefined;
  return raw;
}

export async function updateAppearance(
  _prevState: UpdateAppearanceState,
  formData: FormData
): Promise<UpdateAppearanceState> {
  const session = await verifySession();
  const user = await getCurrentUser();
  if (!user || user.role !== "OWNER") {
    return { error: "Apenas o usuário principal pode alterar a aparência." };
  }

  const fields = {
    corDestaque: parseColor(formData, "corDestaque"),
    corSidebar: parseColor(formData, "corSidebar"),
    corTexto: parseColor(formData, "corTexto"),
    corFundo: parseColor(formData, "corFundo"),
  };

  for (const value of Object.values(fields)) {
    if (value === undefined) {
      return { error: "Use um código hexadecimal válido, ex: #1fa971." };
    }
  }

  await prisma.organization.update({
    where: { id: session.orgId },
    data: fields as { [K in keyof typeof fields]: string | null },
  });

  revalidatePath("/clients", "layout");
  return { success: true };
}
