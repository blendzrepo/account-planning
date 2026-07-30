"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentOrg } from "@/lib/dal";
import { hashPassword } from "@/lib/password";
import { revalidatePath } from "next/cache";

export type CreateOrgState = { error?: string; success?: boolean } | undefined;

const COMBINING_MARKS = /[̀-ͯ]/g;

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(COMBINING_MARKS, "")
    .replace(/[^a-z0-9]+/g, "");
}

async function requirePlatform() {
  const org = await getCurrentOrg();
  if (!org?.isPlatform) {
    throw new Error("Apenas a organização master pode gerenciar organizações.");
  }
}

export async function createOrganization(
  _prevState: CreateOrgState,
  formData: FormData
): Promise<CreateOrgState> {
  await requirePlatform();

  const name = String(formData.get("name") ?? "").trim();
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!name || !username || !password) {
    return { error: "Preencha nome da organização, usuário e senha." };
  }
  if (password.length < 8) {
    return { error: "A senha deve ter pelo menos 8 caracteres." };
  }

  const slug = slugify(name);
  if (!slug) {
    return { error: "Nome de organização inválido." };
  }

  const existing = await prisma.organization.findUnique({ where: { slug } });
  if (existing) {
    return { error: "Já existe uma organização com esse nome." };
  }

  const passwordHash = await hashPassword(password);
  await prisma.organization.create({
    data: {
      name,
      slug,
      users: {
        create: { username, passwordHash, role: "OWNER" },
      },
    },
  });

  revalidatePath("/clients/organizations");
  return { success: true };
}
