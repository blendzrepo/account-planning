import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getSessionPayload } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const verifySession = cache(async () => {
  const session = await getSessionPayload();
  if (!session?.userId || !session.orgId) {
    redirect("/login");
  }
  return session;
});

export const getCurrentUser = cache(async () => {
  const session = await getSessionPayload();
  if (!session?.userId) return null;
  return prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, username: true, role: true, orgId: true },
  });
});

export const getCurrentOrg = cache(async () => {
  const session = await getSessionPayload();
  if (!session?.orgId) return null;
  return prisma.organization.findUnique({ where: { id: session.orgId } });
});
