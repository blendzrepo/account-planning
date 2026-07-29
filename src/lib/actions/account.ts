"use server";

import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";
import { hashPassword, verifyPassword } from "@/lib/password";

export type ChangePasswordState = { error?: string; success?: boolean } | undefined;

export async function changePassword(
  _prevState: ChangePasswordState,
  formData: FormData
): Promise<ChangePasswordState> {
  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: "Preencha todos os campos." };
  }
  if (newPassword.length < 8) {
    return { error: "A nova senha deve ter pelo menos 8 caracteres." };
  }
  if (newPassword !== confirmPassword) {
    return { error: "A confirmação não confere com a nova senha." };
  }

  const session = await verifySession();
  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user) {
    return { error: "Usuário não encontrado." };
  }

  const valid = await verifyPassword(currentPassword, user.passwordHash);
  if (!valid) {
    return { error: "Senha atual incorreta." };
  }

  const passwordHash = await hashPassword(newPassword);
  await prisma.user.update({ where: { id: user.id }, data: { passwordHash } });

  return { success: true };
}
