import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Home() {
  const first = await prisma.client.findFirst({ orderBy: { name: "asc" }, select: { id: true } });
  redirect(first ? `/clients/${first.id}` : "/clients/new");
}
