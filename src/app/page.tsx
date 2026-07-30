import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";

// Avoid querying the database at build time — always resolve per-request.
export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await verifySession();
  const first = await prisma.client.findFirst({
    where: { orgId: session.orgId },
    orderBy: { name: "asc" },
    select: { id: true },
  });
  redirect(first ? `/clients/${first.id}` : "/clients/new");
}
