import { prisma } from "@/lib/prisma";
import AppSidebar from "@/components/AppSidebar";
import { verifySession, getCurrentUser } from "@/lib/dal";

export default async function ClientsLayout({ children }: { children: React.ReactNode }) {
  await verifySession();

  const [clients, user] = await Promise.all([
    prisma.client.findMany({
      select: { id: true, name: true, tag: true },
      orderBy: { name: "asc" },
    }),
    getCurrentUser(),
  ]);

  return (
    <div className="md:flex md:min-h-screen">
      <AppSidebar clients={clients} username={user?.username ?? ""} />
      <main className="flex-1 min-w-0 bg-background">{children}</main>
    </div>
  );
}
