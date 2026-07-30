"use server";

import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

export type LoginState = { error?: string } | undefined;

function normalizeSlug(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "");
}

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const orgSlug = normalizeSlug(String(formData.get("organizacao") ?? ""));
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!orgSlug || !username || !password) {
    return { error: "Preencha organização, usuário e senha." };
  }

  const org = await prisma.organization.findUnique({ where: { slug: orgSlug } });
  if (!org) {
    return { error: "Organização, usuário ou senha inválidos." };
  }

  const user = await prisma.user.findUnique({
    where: { orgId_username: { orgId: org.id, username } },
  });
  if (!user) {
    return { error: "Organização, usuário ou senha inválidos." };
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return { error: "Organização, usuário ou senha inválidos." };
  }

  await createSession(user.id, user.username, user.orgId);
  redirect("/");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
