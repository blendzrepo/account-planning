"use server";

import { prisma } from "@/lib/prisma";
import { verifySession, getCurrentUser } from "@/lib/dal";
import { hashPassword } from "@/lib/password";
import { revalidatePath } from "next/cache";

export type AddTeamMemberState = { error?: string; success?: boolean } | undefined;

async function requireOwner() {
  const session = await verifySession();
  const user = await getCurrentUser();
  if (!user || user.role !== "OWNER") {
    throw new Error("Apenas o usuário principal pode gerenciar a equipe.");
  }
  return session;
}

export async function addTeamMember(
  _prevState: AddTeamMemberState,
  formData: FormData
): Promise<AddTeamMemberState> {
  const session = await requireOwner();

  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { error: "Preencha usuário e senha." };
  }
  if (password.length < 8) {
    return { error: "A senha deve ter pelo menos 8 caracteres." };
  }

  const existing = await prisma.user.findUnique({
    where: { orgId_username: { orgId: session.orgId, username } },
  });
  if (existing) {
    return { error: "Já existe um usuário com esse nome nesta organização." };
  }

  const passwordHash = await hashPassword(password);
  await prisma.user.create({
    data: { orgId: session.orgId, username, passwordHash, role: "MEMBER" },
  });

  revalidatePath("/clients/team");
  return { success: true };
}

export async function removeTeamMember(userId: string) {
  const session = await requireOwner();

  const target = await prisma.user.findUnique({ where: { id: userId } });
  if (!target || target.orgId !== session.orgId) return;
  if (target.role === "OWNER") return;

  await prisma.user.delete({ where: { id: userId } });
  revalidatePath("/clients/team");
}
